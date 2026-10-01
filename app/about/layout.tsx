import type { Metadata } from "next";

// La página es un componente de cliente y no puede exportar metadata;
// este layout le da su propio título de pestaña.
export const metadata: Metadata = {
  title: "Sobre Nosotros",
  description:
    "ASTA: consumibles compatibles para impresoras en Venezuela desde 1995.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
