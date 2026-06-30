import { Metadata } from "next";
import ProductDetailPageClient from "./ProductDetailPageClient";

const SITE_URL = "https://astavenezuela.com";

// 🟢 MODIFICACIÓN: Tipamos params como una Promesa para cumplir con el estándar actual de Next.js
export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  // 🟢 ESPERAMOS a que los parámetros se resuelvan en el servidor
  const resolvedParams = await params;
  const code = resolvedParams.code;

  let title = "Producto | ASTA Venezuela";
  let description =
    "Consulta más información sobre este producto en nuestro catálogo.";
  let odooImageUrl = `${SITE_URL}/placeholder.jpg`;

  try {
    const res = await fetch(`${SITE_URL}/api/productos`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      const product = data.find((p: any) => p.code === code);

      if (product && product.id_odoo) {
        title = `${product.name} | ASTA Venezuela`;
        description = product.description || description;

        // 📷 Ahora sí armará la URL real usando el id_odoo numérico que expusimos en la API
        odooImageUrl = `https://supricom2.odoo.com/web/image/product.template/${product.id_odoo}/image_1024`;
      }
    }
  } catch (error) {
    console.error("Error en generateMetadata:", error);
  }

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
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [odooImageUrl],
    },
  };
}

export default function ProductDetailPage() {
  return <ProductDetailPageClient />;
}
