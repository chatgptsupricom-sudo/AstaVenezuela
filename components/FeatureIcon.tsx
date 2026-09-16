import type { LucideIcon } from "lucide-react";

// Tratamiento único de icono para todo el sitio.
//
// Primero fueron emoji (⭐🚀✅), que dibuja el sistema operativo y se ven
// distintos en cada equipo. Luego pasaron a iconos monolínea en caja pálida,
// que resolvía la consistencia pero no decía nada: caja blanda de borde gris
// junto a un hero de bloques de tinta y canto duro.
//
// Ahora el icono ES un parche: cuadrado macizo con el trazo calado, canto
// recto como los parches de la tira de control. Por defecto en tinta; con
// `canal` se tiñe del color de proceso correspondiente, para secciones donde
// cada tarjeta representa un canal (ver HowItWorks).
//
// El color va por `style`, no por clase de Tailwind: una clase armada con
// template string (p. ej. `bg-process-${canal}`) no la detecta el escaneo
// estático de Tailwind y desaparece del CSS compilado en build.

// Contraste medido con canvas, no a ojo: el trazo blanco sobre --process-c
// (cian claro) da 2.47:1 y sobre --process-y (amarillo) da 1.35:1 — ambos
// por debajo de lo legible. Sobre esos dos canales el trazo va en tinta;
// magenta y negro sí sostienen blanco (4.53:1 y 17.48:1).
const CANALES = {
  c: { fondo: "var(--process-c)", trazo: "var(--ink)" },
  m: { fondo: "var(--process-m)", trazo: "#ffffff" },
  y: { fondo: "var(--process-y)", trazo: "var(--ink)" },
  k: { fondo: "var(--process-k)", trazo: "#ffffff" },
} as const;

export function FeatureIcon({
  icon: Icon,
  tono = "claro",
  tamano = "md",
  canal,
}: {
  icon: LucideIcon;
  /** "oscuro" invierte el parche para secciones sobre tinta. Ignorado si se pasa `canal`. */
  tono?: "claro" | "oscuro";
  tamano?: "sm" | "md" | "lg";
  /** Tiñe el parche del color de proceso del canal, en vez de tinta neutra. */
  canal?: keyof typeof CANALES;
}) {
  const caja = { sm: "size-10", md: "size-14", lg: "size-16" }[tamano];
  const trazo = { sm: "size-5", md: "size-7", lg: "size-8" }[tamano];

  const estilo = canal
    ? { backgroundColor: CANALES[canal].fondo, color: CANALES[canal].trazo }
    : undefined;

  return (
    <span
      aria-hidden="true"
      style={estilo}
      className={`inline-flex shrink-0 items-center justify-center rounded-sm ${caja} ${
        canal
          ? ""
          : tono === "oscuro"
            ? "bg-white text-ink"
            : "bg-ink text-white"
      }`}
    >
      <Icon className={trazo} strokeWidth={1.75} />
    </span>
  );
}
