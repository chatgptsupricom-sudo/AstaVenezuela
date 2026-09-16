// Tira de control: la franja de parches que las imprentas colocan al borde del
// pliego para verificar la densidad de cada canal. Aquí hace de divisor entre
// secciones y de acento del hero.
//
// No es adorno: los cuatro parches son los cuatro canales que cubre el catálogo,
// y el código de cada producto ya lo dice (A-GI-10Y termina en Y de yellow).
// Es decorativa para lectores de pantalla, así que va con aria-hidden.

const CANALES = [
  { nombre: "Cian", color: "var(--process-c)" },
  { nombre: "Magenta", color: "var(--process-m)" },
  { nombre: "Amarillo", color: "var(--process-y)" },
  { nombre: "Negro", color: "var(--process-k)" },
] as const;

export function ControlStrip({
  className = "",
  alto = "h-1.5",
}: {
  className?: string;
  alto?: string;
}) {
  return (
    <div aria-hidden="true" className={`flex w-full ${alto} ${className}`}>
      {CANALES.map((canal) => (
        <span
          key={canal.nombre}
          className="flex-1"
          style={{ backgroundColor: canal.color }}
        />
      ))}
    </div>
  );
}

// Variante en parches sueltos, para acompañar un texto en línea.
export function ControlPatches({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-flex gap-1 ${className}`}>
      {CANALES.map((canal) => (
        <span
          key={canal.nombre}
          className="block size-2 rounded-[1px]"
          style={{ backgroundColor: canal.color }}
        />
      ))}
    </span>
  );
}

// Marcador de un solo canal, para etiquetar bloques.
export function ChannelMark({
  canal,
  className = "",
}: {
  canal: "c" | "m" | "y" | "k";
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`block h-1 w-10 rounded-full ${className}`}
      style={{ backgroundColor: `var(--process-${canal})` }}
    />
  );
}
