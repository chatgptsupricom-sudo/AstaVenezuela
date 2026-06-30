import { Metadata } from "next";
import xmlrpc from "xmlrpc";
import ProductDetailPageClient from "./ProductDetailPageClient";

const SITE_URL = "https://astavenezuela.com";

// 1. FUNCIÓN INTERNA: Conecta directamente a Odoo en el servidor sin pasar por el fetch
async function getOdooProductData(code: string): Promise<any> {
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
            { fields: ["id", "name", "description_sale"], limit: 1 },
          ],
          (err, products) => {
            if (err || !products || products.length === 0) return resolve(null);
            resolve(products[0]); // Retorna el registro puro de Odoo
          },
        );
      },
    );
  });
}

// 2. GENERACIÓN DE METADATA (Next.js 15+ compatible con params asíncronos)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const code = resolvedParams.code;

  let title = "Producto | ASTA Venezuela";
  let description =
    "Consulta más información sobre este producto en nuestro catálogo.";
  let odooImageUrl = `${SITE_URL}/placeholder.jpg`;

  try {
    // Llamamos directo a la función nativa de Odoo
    const product = await getOdooProductData(code);

    if (product && product.id) {
      title = `${product.name} | ASTA Venezuela`;
      description = product.description_sale || description;

      // 📷 Al usar el ID numérico directo de Odoo, la URL se arma perfectamente sin fallas de API
      odooImageUrl = `https://supricom2.odoo.com/web/image/product.template/${product.id}/image_1024`;
    }
  } catch (error) {
    console.error("Error en generateMetadata consultando Odoo:", error);
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
