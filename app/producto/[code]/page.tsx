import { marcaDe, nombreLimpio } from "@/lib/clasificar";
import { Metadata } from "next";
import { cache } from "react";
import xmlrpc from "xmlrpc";
import ProductDetailPageClient from "./ProductDetailPageClient";

const SITE_URL = "https://astavenezuela.com";

// 1. FUNCIÓN INTERNA: Conecta directamente a Odoo en el servidor sin pasar por el fetch
// cache(): generateMetadata y la página piden el mismo producto en la misma
// petición; así Odoo se consulta una sola vez.
const getOdooProductData = cache(async function (code: string): Promise<any> {
  const odooConfig = {
    url: process.env.NEXT_PUBLIC_ODOO_URL || "",
    db: process.env.ODOO_DB || "",
    username: process.env.ODOO_USERNAME || "",
    password: process.env.ODOO_API_KEY || "",
  };

  const host = odooConfig.url ? new URL(odooConfig.url).hostname : "";
  const commonClient = xmlrpc.createSecureClient({
    host,
    port: 443,
    path: "/xmlrpc/2/common",
  });
  const modelsClient = xmlrpc.createSecureClient({
    host,
    port: 443,
    path: "/xmlrpc/2/object",
  });

  return new Promise((resolve) => {
    commonClient.methodCall(
      "authenticate",
      [odooConfig.db, odooConfig.username, odooConfig.password, {}],
      (error, uid) => {
        if (error || !uid) return resolve(null);

        // Buscamos el producto en Odoo usando su SKU/Código
        const searchDomain = [
          ["spiff_brand_id", "in", [951, 925]],
          ["sale_ok", "=", true],
          ["default_code", "=", code],
        ];

        modelsClient.methodCall(
          "execute_kw",
          [
            odooConfig.db,
            uid,
            odooConfig.password,
            "product.template",
            "search_read",
            [searchDomain],
            {
              fields: ["id", "name", "description_sale", "default_code", "qty_available"],
              limit: 1,
            },
          ],
          (err, products) => {
            if (err || !products || products.length === 0) return resolve(null);
            resolve(products[0]); // Retorna el registro puro de Odoo
          },
        );
      },
    );
  });
});

// 2. GENERACIÓN DE METADATA (Next.js 15+ compatible con params asíncronos)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const code = resolvedParams.code;

  // El layout ya añade " | ASTA Venezuela" vía title.template; Open Graph no
  // hereda la plantilla, así que ahí va el sufijo explícito.
  let title = "Producto";
  let description =
    "Consulta más información sobre este producto en nuestro catálogo.";
  let odooImageUrl = `${SITE_URL}/placeholder.jpg`;

  try {
    // Llamamos directo a la función nativa de Odoo
    const product = await getOdooProductData(code);

    if (product && product.id) {
      title = nombreLimpio(product.name);
      description = product.description_sale || description;

      // Misma ruta que pinta la ficha: si Odoo no tiene foto, cae a la foto
      // local de public/productos en vez del genérico de Odoo.
      odooImageUrl = `${SITE_URL}/api/image/product/${product.id}?s=512`;
    }
  } catch (error) {
    console.error("Error en generateMetadata consultando Odoo:", error);
  }

  const socialTitle = `${title} | ASTA Venezuela`;

  return {
    title,
    description,
    openGraph: {
      title: socialTitle,
      description,
      url: `${SITE_URL}/producto/${code}`,
      siteName: "ASTA Venezuela",
      images: [
        {
          url: odooImageUrl,
          width: 800,
          height: 800,
          alt: socialTitle,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [odooImageUrl],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const product = await getOdooProductData(code).catch(() => null);

  // Datos estructurados para Google (schema.org/Product). Sin "offers":
  // el precio de Odoo es un valor de relleno (1) y publicarlo sería falso.
  const jsonLd = product?.id
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: nombreLimpio(product.name),
        sku: product.default_code || code,
        description: product.description_sale || undefined,
        image: `${SITE_URL}/api/image/product/${product.id}?s=512`,
        brand: { "@type": "Brand", name: "ASTA" },
        ...(marcaDe(product.name, code) && {
          isAccessoryOrSparePartFor: {
            "@type": "Brand",
            name: marcaDe(product.name, code),
          },
        }),
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          // JSON.stringify no escapa "<": se reemplaza para que un nombre con
          // "</script>" no pueda cerrar la etiqueta.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\" + "u003c"),
          }}
        />
      )}
      <ProductDetailPageClient />
    </>
  );
}
