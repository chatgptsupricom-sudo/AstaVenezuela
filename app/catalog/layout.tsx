import type { Metadata } from "next";

// La página es un componente de cliente y no puede exportar metadata;
// este layout le da su propio título de pestaña.
export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Busca tóner, tintas, drums y chips ASTA por código o modelo de impresora y cotiza por WhatsApp.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
