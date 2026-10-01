import type { Metadata } from "next";

// La página es un componente de cliente y no puede exportar metadata;
// este layout le da su propio título de pestaña.
export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cotiza por WhatsApp, solicita condiciones de distribuidor o reporta un caso de soporte.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
