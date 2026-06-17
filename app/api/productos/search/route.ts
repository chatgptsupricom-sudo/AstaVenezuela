// app/api/products/search/route.ts
// Endpoint LIGERO de búsqueda para el chatbot (Pandita).
// Reusa la misma conexión a Odoo que tu /api/products, pero:
//   - Acepta ?q= para buscar por modelo de impresora, nombre o código
//   - NO devuelve image_1920 (ahorra muchísimos tokens en el agente)
//   - Devuelve pocos resultados y solo los campos útiles

import { NextResponse } from "next/server";
import xmlrpc from "xmlrpc";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // 👇 término de búsqueda que manda el agente: ?q=L3250 / ?q=B230 / ?q=057H
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim();

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

        // Dominio base: solo marcas ASTA y productos vendibles.
        // Si hay término de búsqueda, agregamos OR sobre name / default_code.
        const baseDomain: any[] = [
          ["spiff_brand_id", "in", [951, 925]],
          ["sale_ok", "=", true],
        ];

        const searchDomain = q
          ? [
              ...baseDomain,
              "|",
              ["name", "ilike", q],
              ["default_code", "ilike", q],
            ]
          : baseDomain;

        // 🔴 OJO: sin image_1920. Solo lo que el bot necesita para responder.
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
            { fields: fields, limit: 15 },
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
              name: p.name || "Sin nombre",
              code: p.default_code || "",
              category: Array.isArray(p.categ_id)
                ? p.categ_id[1]
                : "Sin Categoría",
              price: p.list_price || 0,
              description: p.description_sale || "Sin descripción.",
            }));

            resolve(NextResponse.json(formattedProducts));
          },
        );
      },
    );
  });
}
