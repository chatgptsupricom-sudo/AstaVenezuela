import { odooExecute } from "@/lib/odoo-rpc";
import fotosLocales from "@/lib/product-images.json";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Tamaños que expone Odoo. El catálogo pinta a 150 CSS px, que en pantallas
// 2x necesita ~300: por eso 256 es el mínimo razonable por defecto.
const TAMANOS = {
  "128": "image_128",
  "256": "image_256",
  "512": "image_512",
} as const;

type Tamano = keyof typeof TAMANOS;

// Odoo no siempre devuelve PNG: según cómo se subiera la foto puede venir
// WebP o JPEG. Anunciar un tipo equivocado obliga al navegador a adivinar y
// rompe la optimización de next/image, así que lo deducimos de la cabecera
// binaria en vez de asumir.
function tipoDeImagen(buf: Buffer): string {
  if (buf.length >= 12 && buf.toString("ascii", 8, 12) === "WEBP") {
    return "image/webp";
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) return "image/jpeg";
  if (buf[0] === 0x47 && buf[1] === 0x49) return "image/gif";
  return "image/png";
}

// Si el producto no tiene foto en Odoo devolvemos un placeholder en vez de un
// 404, así <Image> nunca se queda con un hueco roto y el cliente no necesita
// saber de antemano qué productos tienen imagen.
// Es una versión a 256px del logo (10 KB). Servir "ASTA LOGO.png" tal cual
// mandaba 130 KB a 3881x3105 px para pintarlos a 150.
async function logoDeRespaldo() {
  try {
    const archivo = await readFile(
      path.join(process.cwd(), "public", "producto-sin-imagen.png"),
    );
    return new NextResponse(new Uint8Array(archivo), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}

// La mayoría de productos no tiene foto en Odoo, pero sí en public/productos.
// product-images.json empareja default_code -> archivo. Las fotos con nombre
// de código (CF258A.jpg…) se emparejaron por nombre; las numeradas (1.jpg…)
// leyendo el código impreso en la etiqueta de cada caja, solo coincidencias
// exactas. Se excluyen los originales que no son ASTA (p. ej. CRG-057H
// Canon). Al subir fotos a Odoo, ganan esas: este mapa solo se consulta
// cuando Odoo no trae imagen.
async function fotoLocal(codigo: string) {
  const ruta = (fotosLocales as Record<string, string>)[codigo];
  if (!ruta) return null;
  try {
    const archivo = await readFile(path.join(process.cwd(), "public", ruta));
    return new NextResponse(new Uint8Array(archivo), {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return null;
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const idProducto = Number.parseInt(id, 10);

  if (!Number.isInteger(idProducto) || idProducto <= 0) {
    return new NextResponse(null, { status: 400 });
  }

  const pedido = new URL(req.url).searchParams.get("s") ?? "256";
  const campo = TAMANOS[pedido as Tamano] ?? TAMANOS["256"];

  const registros = await odooExecute<Array<Record<string, string | false>>>(
    "product.template",
    "read",
    [[idProducto]],
    { fields: [campo, "default_code"] },
  );

  const b64 = registros?.[0]?.[campo];
  if (!b64 || typeof b64 !== "string") {
    const codigo = registros?.[0]?.default_code;
    return (typeof codigo === "string" && (await fotoLocal(codigo))) || logoDeRespaldo();
  }

  const bytes = Buffer.from(b64, "base64");

  return new NextResponse(new Uint8Array(bytes), {
    headers: {
      "Content-Type": tipoDeImagen(bytes),
      // Las fotos de producto cambian rara vez. Servimos de caché durante un
      // día y revalidamos en segundo plano durante una semana más.
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
