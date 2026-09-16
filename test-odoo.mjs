// Diagnóstico de conexión con Odoo. Uso:
//   node test-odoo.mjs                          -> usa los valores del .env
//   node test-odoo.mjs <usuario> <api_key>      -> prueba credenciales sueltas
import { readFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(new URL(".env", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.trimStart().startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      const key = l.slice(0, i).trim();
      let val = l.slice(i + 1).trim();
      val = val.replace(/\s+#.*$/, "").replace(/^["']|["']$/g, "");
      return [key, val];
    }),
);

const url = env.NEXT_PUBLIC_ODOO_URL.replace(/\/$/, "");
const db = env.ODOO_DB;
const user = process.argv[2] || env.ODOO_USERNAME;
const key = process.argv[3] || env.ODOO_API_KEY;

async function rpc(service, method, args) {
  const res = await fetch(`${url}/jsonrpc`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "call",
      params: { service, method, args },
      id: Date.now(),
    }),
  });
  const json = await res.json();
  if (json.error) throw new Error(json.error.data?.message || json.error.message);
  return json.result;
}

console.log(`Servidor : ${url}`);
console.log(`Base     : ${db}`);
console.log(`Usuario  : ${user}`);
console.log(`API key  : ${key.slice(0, 6)}…${key.slice(-4)}\n`);

const version = await rpc("common", "version", []);
console.log(`✅ Servidor alcanzable — Odoo ${version.server_version}`);
const uid = await rpc("common", "authenticate", [db, user, key, {}]);

if (!uid) {
  console.log("\n❌ AUTENTICACIÓN RECHAZADA (uid = false)");
  console.log("   La base de datos existe, pero el par usuario + API key no es válido.");
  console.log("   Revisa: la key fue revocada, pertenece a otro usuario/base, o el login no es ese.");
  process.exitCode = 1;
} else {
  console.log(`✅ Autenticado — uid = ${uid}\n`);

  // Verificamos el filtro exacto que usa el catálogo
  const domain = [
    ["spiff_brand_id", "in", [951, 925]],
    ["sale_ok", "=", true],
    ["categ_id", "=", 2614],
  ];
  const total = await rpc("object", "execute_kw", [
    db, uid, key, "product.template", "search_count", [domain],
  ]);
  console.log(`Productos que coinciden con el filtro del catálogo: ${total}`);
  if (total === 0) {
    console.log("⚠️  El filtro no devuelve nada. Revisa categ_id=2614 y spiff_brand_id in [951,925].");
  }
}
