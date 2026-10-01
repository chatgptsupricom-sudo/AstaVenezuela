import { NextResponse } from "next/server";
import fotosLocales from "@/lib/product-images.json";
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

  return new Promise<Response>((resolve) => {
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

        // Las imágenes NO viajan en este JSON. Antes iban en base64 y la
        // respuesta pesaba 753 KB: no cacheable, sin optimizar y bloqueando
        // el render. Ahora cada producto expone una URL a /api/image/product,
        // que el navegador cachea y next/image redimensiona por su cuenta.
        const fields = [
          "id",
          "name",
          "default_code",
          "list_price",
          "categ_id",
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
            // 150 dejaba fuera 12 de los 162 productos que casan con el filtro.
            { fields: fields, limit: 500 },
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
              // La ruta devuelve el logo si el producto no tiene foto, así que
              // aquí no hace falta comprobar nada.
              // Sin query string a propósito: next/image exige declarar en
              // images.localPatterns cualquier URL local con parámetros, y no
              // merece la pena acoplar la config a un valor exacto. La ruta
              // sirve 256px por defecto.
              image: `/api/image/product/${p.id}`,
              code: p.default_code || "",
              // Para ordenar el catálogo con foto primero. Solo mira las fotos
              // locales (lib/product-images.json): saber si Odoo tiene imagen
              // obligaría a traer image_128 de los 162 productos.
              // ponytail: los pocos con foto solo en Odoo se ordenan como sin foto.
              conFoto: Boolean(
                (fotosLocales as Record<string, string>)[p.default_code],
              ),
              description: p.description_sale || "Sin descripción.",
            }));

            resolve(NextResponse.json(formattedProducts));
          },
        );
      },
    );
  });
}
