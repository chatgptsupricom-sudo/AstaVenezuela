export type Canal = "c" | "m" | "y" | "k";

export const NOMBRE_CANAL: Record<Canal, string> = {
  c: "Cian",
  m: "Magenta",
  y: "Amarillo",
  k: "Negro",
};

// Muchos códigos de ASTA terminan literalmente en el canal que contienen:
// A-GI-10Y es amarillo, A-GI-11BK es negro. No es una convención inventada
// para este sitio — es así como Odoo ya nombra los productos. Cuando el
// código lo confirma, mostramos el color real de la tinta; cuando no
// (drums, chips, tóner genérico), no hay canal que mostrar y no se inventa
// uno.
//
// El caso que hizo falta cuidar: "W1105A-105ADRUM" termina en "M" porque la
// palabra "DRUM" termina en M, no porque sea magenta. Por eso no se mira
// solo el último carácter: se exige que el último tramo entre guiones sea
// exactamente dígitos + código de canal, nada más pegado.
export function canalDeCodigo(code: string): Canal | null {
  const up = code.toUpperCase();
  const ultimoTramo = up.split("-").pop() || "";
  const m = ultimoTramo.match(/^\d*(BK|C|M|Y)$/);
  if (m) return m[1] === "BK" ? "k" : (m[1].toLowerCase() as Canal);

  if (/CYAN|CIAN/.test(up)) return "c";
  if (/MAGENTA/.test(up)) return "m";
  if (/YELLOW|AMARILLO/.test(up)) return "y";
  if (/BLACK|NEGRO/.test(up)) return "k";

  return null;
}
