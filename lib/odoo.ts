// lib/odoo.ts
import xmlrpc from "xmlrpc";

const odooConfig = {
  url: process.env.NEXT_PUBLIC_ODOO_URL || "",
  db: process.env.ODOO_DB || "",
  username: process.env.ODOO_USERNAME || "",
  password: process.env.ODOO_API_KEY || "",
};

const host = odooConfig.url ? new URL(odooConfig.url).hostname : "";

// 🔴 EL CAMBIO CLAVE: Usar createSecureClient en lugar de createClient
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

export async function getAstaProducts() {
  return new Promise((resolve, reject) => {
    commonClient.methodCall(
      "authenticate",
      [odooConfig.db, odooConfig.username, odooConfig.password, {}],
      (error, uid) => {
        if (error || !uid) {
          console.error(
            "Error de autenticación en Odoo Supricom:",
            error || "UID no retornado",
          );
          return resolve([]);
        }

        const searchDomain = [
          ["categ_id.name", "in", ["ASTA", "CONSU A"]],
          ["sale_ok", "=", true],
        ];

        const fields = [
          "id",
          "name",
          "default_code",
          "list_price",
          "qty_available",
          "categ_id",
          "image_128",
        ];

        modelsClient.methodCall(
          "execute_kw",
          [
            odooConfig.db,
            uid,
            odooConfig.password,
            "product.product",
            "search_read",
            [searchDomain],
            { fields: fields },
          ],
          (err, products) => {
            if (err) {
              console.error("Error al leer productos:", err);
              return resolve([]);
            }

            const formattedProducts = products.map((p: any) => ({
              id: p.id.toString(),
              name: p.name,
              category: Array.isArray(p.categ_id)
                ? p.categ_id[1]
                : "Sin Categoría",
              price: p.list_price,
              stock: p.qty_available,
              image: p.image_128
                ? `data:image/jpeg;base64,${p.image_128}`
                : "/placeholder.jpg",
              code: p.default_code || "",
            }));

            resolve(formattedProducts);
          },
        );
      },
    );
  });
}
