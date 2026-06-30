import { Metadata } from "next";
import ProductDetailPageClient from "./ProductDetailPageClient";

// 🔴 IMPORTANTE: Cambia esto al dominio real de tu página en producción si no usas variables de entorno
const SITE_URL = "https://astavenezuela.com";

export async function generateMetadata({
  params,
}: {
  params: { code: string };
}): Promise<Metadata> {
  const { code } = params;

  // Valores por defecto estrictos para que WhatsApp SIEMPRE pinte la tarjeta gris, pase lo que pase
  let title = "Producto | ASTA Venezuela";
  let description =
    "Consulta más información sobre este producto en nuestro catálogo.";
  let odooImageUrl = `${SITE_URL}/placeholder.jpg`;

  try {
    // Consumimos TU API de productos usando la URL absoluta obligatoria para el servidor
    const res = await fetch(`${SITE_URL}/api/productos`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      // Buscamos el producto por su código dentro de lo que devuelve tu API
      const product = data.find((p: any) => p.code === code);

      if (product && product.id_odoo) {
        title = `${product.name} | ASTA Venezuela`;
        description = product.description || description;

        // 📷 Estructura la URL con el id numérico real e inalterado
        odooImageUrl = `https://supricom2.odoo.com/web/image/product.template/${product.id_odoo}/image_1024`;
      }
    }
  } catch (error) {
    console.error("Error obteniendo metadata desde tu API:", error);
  }

  // Retornamos la estructura exacta que el bot de WhatsApp exige para renderizar la foto
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
