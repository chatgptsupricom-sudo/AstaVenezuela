import { canalDeCodigo } from "@/lib/canal-tinta";
import { odooExecute } from "@/lib/odoo-rpc";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Mismo alcance que /api/productos/rapidito: solo lo que de verdad está en
// el catálogo público. Así un producto que aparece aquí siempre existe
// también en /catalog, y viceversa.
const DOMINIO_CATALOGO = [
  ["spiff_brand_id", "in", [951, 925]],
  ["sale_ok", "=", true],
  ["categ_id", "=", 2614],
];

const CAMPOS = [
  "id",
  "name",
  "default_code",
  "list_price",
  "categ_id",
  "description_sale",
];

interface RegistroOdoo {
  id: number;
  name: string | false;
  default_code: string | false;
  list_price: number | false;
  categ_id: [number, string] | false;
  description_sale?: string | false;
}

function formatear(p: RegistroOdoo) {
  const code = p.default_code || "";
  return {
    id: p.id.toString(),
    id_odoo: p.id,
    name: p.name || "Sin nombre",
    category: Array.isArray(p.categ_id) ? p.categ_id[1] : "Sin Categoría",
    price: p.list_price || 0,
    stock: 0,
    image: `/api/image/product/${p.id}`,
    code,
    description: p.description_sale || "Sin descripción.",
    // null en drums, chips y tóner genérico: no tienen un canal de tinta real.
    canal: code ? canalDeCodigo(code) : null,
  };
}

// Ruta dedicada a la página de un producto — antes esa página llamaba a
// /api/productos (el catálogo COMPLETO, con imágenes en base64 a resolución
// completa) solo para encontrar UN producto por su código y armar "también
// te podría interesar" filtrando en el cliente. Cada visita a cualquier
// producto descargaba el catálogo entero. Aquí se hacen dos consultas
// puntuales a Odoo — el producto exacto, y hasta 5 de su misma categoría —
// y las imágenes viajan como URL, no como datos incrustados.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;

  const productos = await odooExecute<RegistroOdoo[]>(
    "product.template",
    "search_read",
    [[...DOMINIO_CATALOGO, ["default_code", "=", code]]],
    { fields: CAMPOS, limit: 1 },
  );

  if (!productos || productos.length === 0) {
    return NextResponse.json(
      { error: "Producto no encontrado" },
      { status: 404 },
    );
  }

  const producto = formatear(productos[0]);

  const categId = productos[0].categ_id;
  let similares: ReturnType<typeof formatear>[] = [];

  if (Array.isArray(categId)) {
    const registrosSimilares = await odooExecute<RegistroOdoo[]>(
      "product.template",
      "search_read",
      [
        [
          ...DOMINIO_CATALOGO,
          ["categ_id", "=", categId[0]],
          ["id", "!=", productos[0].id],
        ],
      ],
      { fields: CAMPOS, limit: 5 },
    );
    similares = (registrosSimilares || []).map(formatear);
  }

  return NextResponse.json({ product: producto, similares });
}
