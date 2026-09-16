// Cliente JSON-RPC de Odoo para rutas de servidor.
//
// Frente al patrón xmlrpc + callbacks del resto del proyecto, esto:
//   - autentica una sola vez y reutiliza el uid entre peticiones (memo),
//     en vez de hacer un authenticate por cada llamada;
//   - no hardcodea credenciales: todo sale de .env.

const ODOO_URL = (process.env.NEXT_PUBLIC_ODOO_URL || "").replace(/\/$/, "");
const ODOO_DB = process.env.ODOO_DB || "";
const ODOO_USERNAME = process.env.ODOO_USERNAME || "";
const ODOO_API_KEY = process.env.ODOO_API_KEY || "";

async function rpc<T>(
  service: string,
  method: string,
  args: unknown[],
): Promise<T> {
  const res = await fetch(`${ODOO_URL}/jsonrpc`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "call",
      params: { service, method, args },
      id: Date.now(),
    }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Odoo respondió ${res.status}`);

  const json = await res.json();
  if (json.error) {
    throw new Error(json.error?.data?.message || json.error?.message || "RPC");
  }
  return json.result as T;
}

// El uid se cachea entre peticiones. Si la autenticación falla se limpia la
// caché, para que un fallo transitorio no deje la app rota hasta reiniciar.
let uidCache: Promise<number | null> | null = null;

export async function odooUid(): Promise<number | null> {
  if (!uidCache) {
    uidCache = rpc<number | false>("common", "authenticate", [
      ODOO_DB,
      ODOO_USERNAME,
      ODOO_API_KEY,
      {},
    ])
      .then((uid) => (typeof uid === "number" && uid > 0 ? uid : null))
      .catch((err) => {
        console.error("Odoo: fallo de autenticación:", err);
        return null;
      });
  }

  const uid = await uidCache;
  if (uid === null) uidCache = null;
  return uid;
}

export async function odooExecute<T>(
  model: string,
  method: string,
  args: unknown[],
  kwargs: Record<string, unknown> = {},
): Promise<T | null> {
  const uid = await odooUid();
  if (!uid) return null;

  try {
    return await rpc<T>("object", "execute_kw", [
      ODOO_DB,
      uid,
      ODOO_API_KEY,
      model,
      method,
      args,
      kwargs,
    ]);
  } catch (err) {
    console.error(`Odoo: ${model}.${method} falló:`, err);
    return null;
  }
}
