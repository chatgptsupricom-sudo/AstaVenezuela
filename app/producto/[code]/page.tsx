import { Metadata } from "next";
import ProductDetailPageClient from "./ProductDetailPageClient";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://astavenezuela.com";

export async function generateMetadata({
  params,
}: {
  params: { code: string };
}): Promise<Metadata> {
  const { code } = params;

  // Ponemos valores por defecto iniciales por si la API falla, así WhatsApp NO se queda en blanco
  let title = "Producto | ASTA Venezuela";
  let description =
    "Consulta más información sobre este producto en nuestro catálogo.";
  let odooImageUrl = `${SITE_URL}/placeholder.jpg`;

  try {
    const res = await fetch(`${SITE_URL}/api/productos`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      const product = data.find((p: any) => p.code === code);

      if (product) {
        title = `${product.name} | ASTA Venezuela`;
        description = product.description || description;
        // 📷 URL directa de la imagen usando el ID de Odoo
        odooImageUrl = `https://supricom2.odoo.com/web/image/product.template/${product.id}/image_1024`;
      }
    }
  } catch (error) {
    console.error("Error cargando metadata:", error);
  }

  // Retornamos las etiquetas Open Graph pase lo que pase
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/producto/${code}`,
      siteName: "ASTA Venezuela",
      images: [
        {
          url: odooImageUrl,
          width: 800,
          height: 800,
          alt: title,
        },
      ],
      type: "website",
    },
  };
}

export default function ProductDetailPage() {
  return <ProductDetailPageClient />;
}
