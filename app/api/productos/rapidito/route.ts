import { NextResponse } from "next/server";
import xmlrpc from "xmlrpc";

export const dynamic = "force-dynamic";

export async function GET() {
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
        if (error || !uid)
          return resolve(
            NextResponse.json({ error: "Auth failed" }, { status: 500 }),
          );

        const searchDomain = [
          ["spiff_brand_id", "in", [951, 925]],
          ["sale_ok", "=", true],
          ["categ_id", "=", 2614],
        ];

        // ⚡ OPTIMIZACIÓN 1: Cambiamos 'image_1920' por 'image_128' (miniatura de Odoo)
        // Esto reduce el peso del payload JSON en más de un 95%.
        const fields = [
          "id",
          "name",
          "default_code",
          "list_price",
          "categ_id",
          "image_128",
          "description_sale",
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
            { fields: fields, limit: 150 },
          ],
          (err, products) => {
            if (err) {
              console.error("Error Odoo:", err);
              return resolve(
                NextResponse.json({ error: "Error en Odoo" }, { status: 500 }),
              );
            }

            const formattedProducts = products.map((p: any) => ({
              id: p.id.toString(),
              id_odoo: p.id,
              name: p.name || "Sin nombre",
              category: Array.isArray(p.categ_id)
                ? p.categ_id[1]
                : "Sin Categoría",
              price: p.list_price || 0,
              stock: 0,
              // ⚡ OPTIMIZACIÓN 2: Usamos el Base64 ligero de 128px o un fallback estático
              image: p.image_128
                ? `data:image/jpeg;base64,${p.image_128}`
                : "/ASTA LOGO.png",
              code: p.default_code || "",
              description: p.description_sale || "Sin descripción.",
            }));

            resolve(NextResponse.json(formattedProducts));
          },
        );
      },
    );
  });
}
