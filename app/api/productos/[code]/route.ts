import { canalDeCodigo } from "@/lib/canal-tinta";
import { parecidos, tipoDe } from "@/lib/clasificar";
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
  // Existencias físicas en Odoo; la ficha decide "En stock" / "Sin stock".
  "qty_available",
];

interface RegistroOdoo {
  id: number;
  name: string | false;
  default_code: string | false;
  list_price: number | false;
  categ_id: [number, string] | false;
  description_sale?: string | false;
  qty_available?: number;
}

function formatear(p: RegistroOdoo) {
  const code = p.default_code || "";
  return {
    id: p.id.toString(),
    id_odoo: p.id,
    name: p.name || "Sin nombre",
    category: Array.isArray(p.categ_id) ? p.categ_id[1] : "Sin Categoría",
    price: p.list_price || 0,
    stock: p.qty_available ?? 0,
    image: `/api/image/product/${p.id}`,
    code,
    // Vacío cuando Odoo no tiene texto: la ficha oculta el bloque en vez de
    // mostrar un "Sin descripción." literal.
    description: p.description_sale || "",
    // null en drums y chips: no tienen un canal de tinta real. Si el código no
    // lo dice ("A-W2112A-CH"), se mira el nombre ("... YELLOW"), solo en
    // tóner y tinta.
    canal:
      (code ? canalDeCodigo(code) : null) ??
      (["Tóner", "Tinta"].includes(tipoDe(p.name || "") ?? "")
        ? canalDeCodigo(p.name || "")
        : null),
  };
}

// Ruta dedicada a la página de un producto — antes esa página llamaba a
// /api/productos (el catálogo COMPLETO, con imágenes en base64 a resolución
// completa) solo para encontrar UN producto por su código y armar "también
// te podría interesar" filtrando en el cliente. Cada visita a cualquier
// producto descargaba el catálogo entero (con imágenes). Ahora es UNA
// consulta a Odoo del catálogo sin imágenes (162 filas ligeras): de ahí sale
// el producto y sus parecidos, y las fotos viajan como URL.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;

  const catalogo = (
    (await odooExecute<RegistroOdoo[]>(
      "product.template",
      "search_read",
      [DOMINIO_CATALOGO],
      { fields: CAMPOS, limit: 500 },
    )) || []
  ).map(formatear);

  const producto = catalogo.find((p) => p.code === code);
  if (!producto) {
    return NextResponse.json(
      { error: "Producto no encontrado" },
      { status: 404 },
    );
  }

  // Antes eran los 5 primeros de la categoría (que es una sola para todo el
  // catálogo): a un tóner HP le salían tintas Canon y chips. Ahora son los
  // de la misma familia — otros colores, con/sin chip, variante A/X.
  const similares = parecidos(producto, catalogo);

  return NextResponse.json({ product: producto, similares });
}
