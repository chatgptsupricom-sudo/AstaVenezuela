// Marca y tipo de un producto a partir de su nombre y código de Odoo, para
// los filtros del catálogo y la ficha técnica. Odoo no trae estos datos en
// campos propios: la mitad de los nombres no dicen la marca ("ASTA TONER
// CF258A NEGRO"), pero el código del cartucho original sí la delata.

export const MARCAS = [
  "HP",
  "Canon",
  "Epson",
  "Brother",
  "Samsung",
  "Xerox",
] as const;
export type Marca = (typeof MARCAS)[number];

export const TIPOS = ["Tóner", "Tinta", "Drum", "Chip"] as const;
export type Tipo = (typeof TIPOS)[number];

// Prefijos de código OEM. Van con \b delante para no confundir, por ejemplo,
// el "CE" de "CE285A" con cualquier palabra que contenga esas letras.
const PREFIJOS: [RegExp, Marca][] = [
  [/\b(CE|CF|CB|CC|Q)\d{3,4}[A-Z]?\b|\bW\d{4}/, "HP"],
  [/\b(CRG|GI|PFI|NPG|GPR)[-.\s]?\d/, "Canon"],
  [/\b(TN|DR)[-\s]?\d/, "Brother"],
  [/\bMLT[-\s]?D?\d/, "Samsung"],
  [/\b0{1,2}6R\d/, "Xerox"],
  [/\bT\d{3,4}\b|\b(544|664|504)\b/, "Epson"],
];

export function marcaDe(nombre: string, codigo = ""): Marca | null {
  const texto = `${nombre} ${codigo}`.toUpperCase();
  // La marca escrita gana: "TONER CANON CRG-047" es Canon aunque el patrón
  // de HP también pudiera encajar en algún código combinado.
  const escrita = MARCAS.find((m) => new RegExp(`\\b${m.toUpperCase()}\\b`).test(texto));
  if (escrita) return escrita;
  return PREFIJOS.find(([re]) => re.test(texto))?.[1] ?? null;
}

// Se toma la PRIMERA palabra de tipo que aparece en el nombre: "ASTA TONER
// W2121A CON CHIP" es un tóner, no un chip; "ASTA CHIP W1105A" es un chip.
const PALABRAS_TIPO: [RegExp, Tipo][] = [
  [/\b(TONER|TÓNER|POLVO|CARTUCHO)\b/, "Tóner"],
  [/\b(TINTA|BOTELLA)\b/, "Tinta"],
  [/\b(DRUM|TAMBOR|OPC)\b/, "Drum"],
  [/\bCHIP\b/, "Chip"],
];

// Búsqueda tolerante para el catálogo. El revendedor escribe el código como
// lo tiene a mano: "gi11", "cf 226a", "CRG054". Se compara sin espacios,
// guiones, puntos, barras ni paréntesis, sin tildes, y los colores en
// español también encuentran los nombres en inglés de Odoo ("amarillo" ->
// YELLOW). Todas las palabras de la búsqueda deben aparecer.
const compacto = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]/g, "");

const SINONIMOS: Record<string, string[]> = {
  amarillo: ["amarillo", "yellow"],
  negro: ["negro", "black", "bk"],
  cian: ["cian", "cyan"],
  cyan: ["cian", "cyan"],
  azul: ["cian", "cyan"],
  magenta: ["magenta"],
  tambor: ["tambor", "drum"],
  botella: ["botella", "tinta"],
};

export function coincideBusqueda(q: string, nombre: string, codigo = "") {
  const pajar = compacto(`${nombre} ${codigo}`);
  return q
    .split(/\s+/)
    .map(compacto)
    .filter(Boolean)
    .every((palabra) =>
      (SINONIMOS[palabra] ?? [palabra]).some((alt) => pajar.includes(alt)),
    );
}

// "[CRG-047] TONER CANON NEGRO" -> "TONER CANON NEGRO". El código entre
// corchetes ya se muestra aparte como SKU.
export const nombreLimpio = (nombre: string) =>
  nombre.replace(/^\s*\[[^\]]*\]\s*/, "");

// Si lleva chip o no, cuando el nombre o el código lo dicen.
export function chipDe(nombre: string, codigo = ""): "Con chip" | "Sin chip" | null {
  const t = `${nombre} ${codigo}`.toUpperCase();
  if (/\b(NO|SIN)\s+CHIP\b/.test(t)) return "Sin chip";
  if (/\bCON\s+CHIP\b|-CH\b|WITH CHIP/.test(t)) return "Con chip";
  return null;
}

// Códigos de modelo dentro de nombre+código, normalizados para compararse:
// "GI-10" -> GI10, "CRG-052" -> CRG052. Cada uno se añade también sin sus
// letras finales (GI10Y -> GI10, CF258A -> CF258) para que los colores y las
// variantes A/X de un mismo cartucho caigan en la misma familia.
function codigosDe(nombre: string, codigo: string): Set<string> {
  const t = `${nombre} ${codigo}`.toUpperCase().replace(/([A-Z])-(\d)/g, "$1$2");
  const out = new Set<string>();
  for (const tok of t.match(/[A-Z]*\d+[A-Z]*/g) ?? []) {
    if (tok.length < 3) continue;
    out.add(tok);
    const base = tok.replace(/[A-Z]+$/, "");
    if (base.length >= 3 && /\d/.test(base)) out.add(base);
  }
  return out;
}

// Productos parecidos para "También te podría interesar": primero los de la
// misma familia (comparten un código de modelo), luego mismo tipo y marca.
export function parecidos<T extends { name: string; code: string }>(
  base: T,
  lista: T[],
  n = 5,
): T[] {
  const cb = codigosDe(base.name, base.code);
  const tb = tipoDe(base.name);
  const mb = marcaDe(base.name, base.code);
  return lista
    .filter((p) => p.code !== base.code)
    .map((p) => {
      let puntos = 0;
      for (const c of codigosDe(p.name, p.code)) if (cb.has(c)) puntos += 10;
      if (tb && tipoDe(p.name) === tb) puntos += 3;
      if (mb && marcaDe(p.name, p.code) === mb) puntos += 2;
      return { p, puntos };
    })
    // 5 = mismo tipo y marca como mínimo; con solo el tipo, a un tóner
    // Samsung le salían tóneres Canon.
    .filter((x) => x.puntos >= 5)
    .sort((a, b) => b.puntos - a.puntos || a.p.name.localeCompare(b.p.name))
    .slice(0, n)
    .map((x) => x.p);
}

export function tipoDe(nombre: string): Tipo | null {
  const texto = nombre.toUpperCase();
  let mejor: { pos: number; tipo: Tipo } | null = null;
  for (const [re, tipo] of PALABRAS_TIPO) {
    const m = re.exec(texto);
    if (m && (!mejor || m.index < mejor.pos)) mejor = { pos: m.index, tipo };
  }
  return mejor?.tipo ?? null;
}
