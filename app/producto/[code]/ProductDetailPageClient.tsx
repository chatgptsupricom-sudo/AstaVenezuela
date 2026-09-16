"use client";

import { ControlPatches, ControlStrip } from "@/components/ControlStrip";
import { Navbar } from "@/components/Navbar";
import { NOMBRE_CANAL, type Canal } from "@/lib/canal-tinta";
import { motion } from "framer-motion";
import { ArrowLeft, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Producto {
  id: string;
  id_odoo?: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  code: string;
  description: string;
  // null en drums, chips y tóner genérico: no son un color de tinta real.
  canal: Canal | null;
}

type Estado = "cargando" | "no-encontrado" | "listo";

function DetalleSkeleton() {
  return (
    <div
      role="status"
      aria-label="Cargando producto"
      className="grid gap-8 md:grid-cols-2 md:gap-16"
    >
      <div className="aspect-square animate-pulse rounded-lg bg-slate-100 md:aspect-[4/3]" />
      <div className="flex flex-col justify-center gap-4">
        <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
        <div className="h-10 w-full animate-pulse rounded bg-slate-100" />
        <div className="h-10 w-2/3 animate-pulse rounded bg-slate-100" />
        <div className="mt-4 h-20 w-full animate-pulse rounded bg-slate-100" />
        <div className="mt-4 h-12 w-48 animate-pulse rounded-lg bg-slate-100" />
      </div>
    </div>
  );
}

export default function ProductDetailPageClient() {
  const { code } = useParams<{ code: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<Producto | null>(null);
  const [similares, setSimilares] = useState<Producto[]>([]);
  const [estado, setEstado] = useState<Estado>("cargando");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let vigente = true;
    // Al navegar de un producto a "también te podría interesar" el código
    // cambia pero el componente es el mismo: sin este reset se seguiría
    // mostrando el producto anterior mientras llega el nuevo.
    setEstado("cargando");
    setProduct(null);

    fetch(`/api/productos/${encodeURIComponent(code)}`)
      .then(async (res) => {
        if (!vigente) return;
        if (!res.ok) {
          setEstado("no-encontrado");
          return;
        }
        const data = await res.json();
        setProduct(data.product);
        setSimilares(data.similares || []);
        setEstado("listo");
      })
      .catch(() => {
        if (vigente) setEstado("no-encontrado");
      });

    return () => {
      vigente = false;
    };
  }, [code]);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleWhatsAppClick = () => {
    if (!product) return;
    const phoneNumber = "584228008204";
    const message = `Hola, quiero más información sobre este producto:\n\n*Producto:* ${product.name}\n*Código:* ${product.code}\n\nLink del producto: ${currentUrl}`;
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const handleShareClick = async () => {
    if (!product) return;
    const shareData = {
      title: product.name,
      text: `Mira este producto: ${product.name}`,
      url: currentUrl,
    };
    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
      } catch {
        // El usuario cerró el panel de compartir: no es un error que reportar.
      }
    } else {
      try {
        await navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("No se pudo copiar el enlace", err);
      }
    }
  };

  // Estilos que dependen del canal real del producto (o su ausencia), para
  // el marco de la imagen y el chip informativo — ver lib/canal-tinta.ts.
  const canal = product?.canal ?? null;
  const marcoEstilo = canal
    ? ({ ["--canal" as string]: `var(--process-${canal})` } as const)
    : undefined;
  const marcoClase = canal
    ? "border-[var(--canal)]/25 bg-[var(--canal)]/[0.05]"
    : "border-slate-200 bg-surface";

  return (
    <>
      <Navbar />
      {/* La tira de control marca esta página como parte del mismo sistema
          que Catálogo, Sobre Nosotros y Contacto — era la única página del
          sitio sin ningún rastro de la identidad de marca. */}
      <div className="pt-24">
        <ControlStrip alto="h-1.5" />
      </div>

      <main className="min-h-screen bg-white px-4 pb-20 pt-8 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <Link
            href="/catalog"
            className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-500 transition-colors hover:text-brand-strong"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-4"
              strokeWidth={1.75}
            />
            Volver al catálogo
          </Link>

          {estado === "cargando" && <DetalleSkeleton />}

          {estado === "no-encontrado" && (
            <div role="alert" className="py-20 text-center">
              <ControlPatches className="mx-auto mb-6" />
              <h1 className="font-display text-3xl font-black uppercase tracking-tight text-ink [font-stretch:110%]">
                No encontramos este producto
              </h1>
              <p className="mx-auto mt-3 max-w-md text-slate-500">
                El código puede haber cambiado o el producto ya no está
                disponible. Prueba a buscarlo de nuevo en el catálogo.
              </p>
              <Link
                href="/catalog"
                className="mt-8 inline-block rounded-lg bg-brand-strong px-6 py-3 font-bold text-white transition-colors hover:bg-brand-darker focus-on-brand"
              >
                Ir al catálogo
              </Link>
            </div>
          )}

          {estado === "listo" && product && (
            <>
              <div className="grid gap-8 md:grid-cols-2 md:gap-16">
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={marcoEstilo}
                  className={`relative flex aspect-square w-full items-center justify-center rounded-lg border transition-colors md:aspect-[4/3] ${marcoClase}`}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </motion.div>

                <div className="flex flex-col justify-center">
                  <span className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-brand-strong">
                    {product.category}
                  </span>

                  {/*
                    Sin `uppercase`: los nombres de producto de Odoo son
                    técnicos y largos ("ASTA CARTUCHO DE TONER BROTHER DE
                    ULTRA ALTO RENDIMIENTO..."). Forzarlos a mayúsculas a
                    escala de titular, como el resto de los H1 del sitio, los
                    haría ilegibles en vez de contundentes.
                  */}
                  <h1 className="mb-6 font-display text-3xl font-black leading-tight text-ink md:text-4xl lg:text-5xl">
                    {product.name}
                  </h1>

                  {/* Franja de datos: antes era texto suelto flotando en
                      blanco, sin ningún borde que lo agrupara como una sola
                      pieza de información. */}
                  <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-slate-100 py-4">
                    <span className="rounded-full bg-emerald-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
                      En stock
                    </span>
                    <span className="font-mono text-sm text-slate-500">
                      SKU: {product.code}
                    </span>
                    {canal && (
                      <span className="flex items-center gap-2 font-mono text-sm text-slate-500">
                        <span
                          aria-hidden="true"
                          className="size-3 rounded-sm"
                          style={{ backgroundColor: `var(--process-${canal})` }}
                        />
                        Canal: {NOMBRE_CANAL[canal]}
                      </span>
                    )}
                  </div>

                  <p className="mb-10 border-l-4 border-slate-200 pl-6 text-base leading-relaxed text-slate-600 md:text-lg">
                    {product.description}
                  </p>

                  <div className="flex w-full flex-col items-center gap-4 sm:w-fit sm:flex-row">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleWhatsAppClick}
                      className="flex w-full items-center justify-center gap-3 whitespace-nowrap rounded-lg bg-whatsapp px-6 py-3.5 text-sm font-black tracking-wide text-white shadow-sm transition-colors hover:bg-whatsapp-dark sm:w-fit md:text-base"
                    >
                      <Image
                        src="/whatsapp-wh.png"
                        alt=""
                        width={22}
                        height={22}
                        className="object-contain"
                      />
                      Consultar
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleShareClick}
                      className="flex w-full items-center justify-center gap-3 whitespace-nowrap rounded-lg bg-slate-100 px-6 py-3.5 text-sm font-bold tracking-wide text-ink transition-colors hover:bg-slate-200 sm:w-fit md:text-base"
                    >
                      <Share2
                        aria-hidden="true"
                        className="size-4"
                        strokeWidth={1.75}
                      />
                      {copied ? "¡Enlace copiado!" : "Compartir"}
                    </motion.button>
                  </div>
                </div>
              </div>

              {similares.length > 0 && (
                <section className="mt-20 md:mt-32">
                  <h2 className="mb-10 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                    También te podría interesar
                  </h2>
                  <ul
                    role="list"
                    className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-5"
                  >
                    {similares.map((p) => (
                      <li key={p.id}>
                        <motion.div
                          whileHover={{ y: -4 }}
                          className="group cursor-pointer rounded-lg border border-slate-200 p-4 transition-all hover:border-brand-strong/40 hover:shadow-md"
                          onClick={() => router.push(`/producto/${p.code}`)}
                        >
                          <div className="relative mb-4 aspect-square">
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 50vw, 20vw"
                            />
                          </div>
                          <h3 className="line-clamp-2 text-sm font-bold leading-tight text-slate-800">
                            {p.name}
                          </h3>
                        </motion.div>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
