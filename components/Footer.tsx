import { ControlStrip } from "@/components/ControlStrip";
import { enlaceWhatsApp, MENSAJE_GENERAL } from "@/lib/whatsapp";
import Image from "next/image";
import Link from "next/link";

// Pie compartido por todas las páginas (se monta en app/layout.tsx).
// Foco arriba-izquierda como las cabeceras: el contenido del pie (logo,
// columnas) empieza alineado a ese lado, no centrado.
//
// Texto en slate-100 (5,2:1 sobre --brand-strong, el punto más claro del
// degradado). slate-300 daba 3,8:1 y no pasaba AA.
export function Footer() {
  return (
    <>
      <ControlStrip alto="h-1.5" />
      <footer className="bg-[radial-gradient(140%_140%_at_12%_15%,var(--brand-strong)_0%,var(--ink)_100%)] py-14 text-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
            <div className="max-w-sm">
              <Image
                src="/ASTA LOGO.png"
                alt="ASTA"
                width={140}
                height={40}
                className="mb-4 h-9 w-auto object-contain brightness-0 invert"
              />
              <p className="text-slate-100">
                Tóner, tintas, drums y chips que rinden lo que dice la caja.
                Distribuyendo en Venezuela desde 1995.
              </p>
            </div>

            <div>
              <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-100">
                Cotiza
              </h2>
              <ul className="flex flex-col gap-1 text-slate-100">
                <li>
                  <a
                    href={enlaceWhatsApp(MENSAJE_GENERAL)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-on-brand inline-block py-3 font-bold text-white hover:underline"
                  >
                    WhatsApp +58 422 8008204
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+584228008204"
                    className="focus-on-brand inline-block py-3 hover:text-white"
                  >
                    Teléfono +58 (422)-8008204
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:webstore@astavenezuela.com"
                    className="focus-on-brand inline-block py-3 hover:text-white"
                  >
                    webstore@astavenezuela.com
                  </a>
                </li>
              </ul>
            </div>

            <nav aria-label="Navegación del pie de página">
              <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-100">
                Navegación
              </h2>
              <ul className="flex flex-col gap-1 text-slate-100">
                {[
                  ["/", "Inicio"],
                  ["/catalog", "Catálogo"],
                  ["/about", "Sobre Nosotros"],
                  ["/contact", "Contacto"],
                ].map(([href, texto]) => (
                  <li key={href}>
                    {/* py-3: objetivo táctil de 44px sin cambiar el ritmo visual */}
                    <Link
                      href={href}
                      className="focus-on-brand inline-block py-3 hover:text-white"
                    >
                      {texto}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-10 border-t border-white/15 pt-8 text-center text-sm text-slate-100">
            <p>
              &copy; {new Date().getFullYear()} ASTA. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
