"use client";

import { Banner } from "@/components/Banner";
import { ControlPatches, ControlStrip } from "@/components/ControlStrip";
import { FeatureIcon } from "@/components/FeatureIcon";
import { Navbar } from "@/components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MARCAS, marcaDe, nombreLimpio, tipoDe } from "@/lib/clasificar";
import { enlaceWhatsApp, MENSAJE_GENERAL } from "@/lib/whatsapp";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Globe,
  Mail,
  Phone,
  Search,
  ShieldCheck,
  ShoppingCart,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Destacado {
  id: string;
  name: string;
  code: string;
  image: string;
  conFoto?: boolean;
}

// "¿Por qué ASTA?": mismos textos de siempre. Antes eran 6 tarjetas iguales
// con icono + título + 3 viñetas (la retícula más genérica que hay); ahora es
// una lista de filas, cada una marcada con su canal de la tira de control.
const VENTAJAS = [
  {
    title: "Calidad Premium",
    desc: "Nuestros tóneres pasan por 12 pruebas de control antes de llegar a ti.",
    points: ["Certificación ISO 9001", "Negros más profundos", "Cero manchas"],
  },
  {
    title: "Máximo Rendimiento",
    desc: "Diseñados para exprimir cada gota de tinta y gramo de polvo.",
    points: ["+20% páginas extra", "Carga ultra-rápida", "Ahorro energético"],
  },
  {
    title: "Garantía Total",
    desc: "Si el producto falla, nosotros respondemos. Sin preguntas incómodas.",
    points: ["Soporte 24/7", "Cambio inmediato", "Protección de equipo"],
  },
  {
    title: "Stock Inmediato",
    desc: "El inventario más grande del país a tu disposición.",
    points: ["Envío en 24h", "Logística propia"],
  },
  {
    title: "Precios de Fábrica",
    desc: "Eliminamos intermediarios para darte el mejor costo por página.",
    points: ["Planes corporativos", "Descuentos por volumen", "Crédito aliado"],
  },
  {
    title: "Compatibilidad",
    desc: "Integración perfecta. Tu impresora no notará la diferencia.",
    points: ["Chips de última gen", "Ajuste milimétrico", "Update friendly"],
  },
];

const PASOS = [
  {
    step: "01",
    title: "Selecciona",
    description:
      "Busca tu consumible en el catálogo por código o por modelo de impresora.",
    icon: Search,
    canal: "c",
  },
  {
    step: "02",
    title: "Consulta",
    description:
      "Escríbenos por WhatsApp y te confirmamos compatibilidad y precio.",
    icon: FileText,
    canal: "m",
  },
  {
    step: "03",
    title: "Ordena",
    description: "Confirma tu pedido y coordinamos la entrega contigo.",
    icon: ShoppingCart,
    canal: "y",
  },
  {
    step: "04",
    title: "Recibe",
    description: "Te llega listo para instalar, con la garantía ASTA.",
    icon: ShieldCheck,
    canal: "k",
  },
] as const;

const TESTIMONIOS = [
  {
    name: "Carlos Rodríguez",
    company: "Copias Rápidas SRL",
    comment:
      "Los tóneres ASTA tienen la mejor relación calidad-precio. Nuestros clientes notaron inmediatamente la mejora en las impresiones.",
  },
  {
    name: "María López",
    company: "Imprenta Digital Plus",
    comment:
      "Excelente servicio y productos de calidad. El equipo de ASTA siempre está disponible para ayudarnos.",
  },
  {
    name: "Juan Pérez",
    company: "Centro de Impresión Moderno",
    comment:
      "Llevar ASTA como distribuidor ha sido la mejor decisión para mi negocio. Stock garantizado y precios competitivos.",
  },
];

const PREGUNTAS = [
  {
    q: "¿Qué garantía tienen los productos ASTA?",
    a: "Todos nuestros productos incluyen garantía de satisfacción. Ofrecemos cambio o reembolso inmediato bajo nuestros términos de garantía premium.",
  },
  {
    q: "¿Son los tóneres ASTA realmente compatibles?",
    a: "Sí, cada unidad es sometida a rigurosas pruebas de ingeniería para garantizar el 100% de compatibilidad y rendimiento idéntico al original.",
  },
  {
    q: "¿Cuál es el tiempo de entrega?",
    a: "Operamos con logística prioritaria. Entregas en 24-48 horas para el área metropolitana.",
  },
  {
    q: "¿Ofrecen descuentos por volumen?",
    a: "Absolutamente. Contamos con una estructura de precios escalonada para distribuidores y mayoristas.",
  },
  {
    q: "¿Cómo puedo ser distribuidor autorizado?",
    // Antes decía "escríbenos a nuestro correo oficial", sin decir cuál: el
    // camino real es el formulario con el asunto ya elegido.
    a: "Buscamos aliados estratégicos. Completa la solicitud de distribuidor en nuestra página de contacto y te escribimos con las condiciones.",
    enlace: { href: "/contact?asunto=distribuidor#solicitud", texto: "Solicitar condiciones" },
  },
];

const CANALES = ["c", "m", "y", "k"] as const;

export default function Home() {
  const [products, setProducts] = useState<Destacado[]>([]);
  // Total del catálogo para los contadores; `products` son solo los destacados.
  const [totalCatalogo, setTotalCatalogo] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        const res = await fetch("/api/productos/rapidito");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: Destacado[] = await res.json();

        // Destacados: 12 al azar entre los que tienen foto.
        const conFoto = data.filter((p) => p.conFoto);
        const azar = [...conFoto].sort(() => Math.random() - 0.5);

        setTotalCatalogo(data.length);
        setProducts(azar.slice(0, 12));
      } catch (error) {
        console.error("Error cargando productos destacados:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadFeaturedProducts();
  }, []);

  // Sin autoplay: el carrusel se movía solo cada 3,5 s y competía con la
  // lectura. Ahora avanza con las flechas o deslizando.
  const scroll = (direction: "left" | "right") => {
    carouselRef.current?.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-surface">
        {/* HERO: el revendedor llega con un código en la mano. El buscador es
            la acción principal; es un <form> GET normal hacia /catalog?q=,
            así que funciona incluso antes de que cargue el JavaScript. */}
        <section className="relative bg-white pt-28 pb-0 lg:pt-24">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-7"
              >
                <ControlPatches className="mb-7" />

                <h1 className="font-display text-[clamp(2.75rem,7vw,5.5rem)] font-black uppercase leading-[0.86] tracking-[-0.02em] text-ink [font-stretch:125%]">
                  Impresión <span className="text-brand-strong">Perfecta</span>
                </h1>

                <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-600">
                  Tóner, tintas, drums y chips compatibles con las impresoras
                  que ya tienes. Sin cambiar de equipo ni de proveedor.
                </p>

                <form
                  action="/catalog"
                  method="get"
                  role="search"
                  className="mt-9 max-w-xl"
                >
                  <label
                    htmlFor="hero-buscar"
                    className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-slate-600"
                  >
                    Busca tu consumible por código o modelo
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="hero-buscar"
                      name="q"
                      type="search"
                      placeholder="Ej. CF258A, GI-11 o LaserJet 1160"
                      className="min-h-14 w-full min-w-0 rounded-lg border-2 border-slate-200 bg-white px-5 font-mono text-ink placeholder:text-slate-500 focus:border-ink"
                    />
                    <button
                      type="submit"
                      className="flex min-h-14 shrink-0 items-center gap-2 rounded-lg bg-ink px-6 font-display font-bold text-white transition-colors hover:bg-brand-strong focus-on-brand"
                    >
                      <Search aria-hidden="true" className="size-5" />
                      <span className="hidden sm:inline">Buscar</span>
                      <span className="sr-only sm:hidden">Buscar</span>
                    </button>
                  </div>
                </form>

                <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold">
                  <a
                    href={enlaceWhatsApp(MENSAJE_GENERAL)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 text-whatsapp underline-offset-4 hover:underline"
                  >
                    O cotiza directo por WhatsApp
                  </a>
                  <Link
                    href="/catalog"
                    className="inline-flex min-h-11 items-center text-ink underline-offset-4 hover:underline"
                  >
                    Ver todo el catálogo →
                  </Link>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                // En móvil el panda va debajo del buscador: arriba empujaba
                // la acción principal al pie de la pantalla.
                className="relative flex items-end justify-center lg:col-span-5"
              >
                <Image
                  src="/ASTA MASCOTA.png"
                  alt="Mascota de ASTA"
                  width={500}
                  height={500}
                  priority
                  sizes="(max-width: 1024px) 60vw, 420px"
                  className="relative h-auto max-h-[220px] w-auto object-contain md:max-h-[380px] lg:max-h-[460px]"
                />
              </motion.div>
            </div>
          </div>

          {/* La tira cierra el pliego y separa el titular de los banners */}
          <ControlStrip className="mt-12" alto="h-2" />

          {/* Banners: lo que un comprador pregunta antes de pedir precio */}
          <div className="bg-surface py-10">
            <div className="container mx-auto max-w-7xl px-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Banner
                  canal="c"
                  dato={totalCatalogo > 0 ? `${totalCatalogo}+` : "···"}
                  titulo="Modelos compatibles"
                  descripcion="HP, Canon, Epson, Brother, Samsung y Xerox. Busca por código y comprueba el tuyo."
                  href="/catalog"
                  accion="Buscar mi modelo"
                />
                <Banner
                  canal="m"
                  dato="30K+"
                  titulo="Clientes atendidos"
                  descripcion="Oficinas, centros de copiado y distribuidores en toda Venezuela."
                  href="/about"
                  accion="Conocer ASTA"
                />
                <Banner
                  canal="y"
                  dato="1995"
                  titulo="Años en el mercado"
                  descripcion="Tres décadas de respaldo, stock y asesoría técnica en Venezuela."
                  href="/contact"
                  accion="Pedir asesoría"
                />
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTOS DESTACADOS */}
        <section className="bg-white py-20">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl font-black uppercase tracking-tight text-ink [font-stretch:115%] lg:text-4xl">
                  Productos Destacados
                </h2>
                <p className="mt-2 text-lg text-slate-600">
                  Conoce nuestros productos más populares y mejor valorados
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => scroll("left")}
                  aria-label="Productos anteriores"
                  className="flex size-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-ink transition-colors hover:border-ink"
                >
                  <ChevronLeft aria-hidden="true" size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => scroll("right")}
                  aria-label="Productos siguientes"
                  className="flex size-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-ink transition-colors hover:border-ink"
                >
                  <ChevronRight aria-hidden="true" size={20} />
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="h-[400px] w-full animate-pulse rounded-xl border border-slate-100 bg-slate-50"
                  />
                ))}
              </div>
            ) : (
              // `relative`: los <span class="sr-only"> de las tarjetas son
              // position:absolute; sin un ancestro posicionado no los recorta
              // el overflow y estiraban la página a ~3500px de ancho.
              <div
                ref={carouselRef}
                className="relative flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
                style={{ scrollbarWidth: "none" }}
              >
                {products.map((product) => {
                  const etiqueta = [tipoDe(product.name), marcaDe(product.name, product.code)]
                    .filter(Boolean)
                    .join(" · ");
                  return (
                    <article
                      key={product.id}
                      className="flex w-[280px] min-w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-slate-200 bg-white md:w-[calc(50%-12px)] md:min-w-[calc(50%-12px)] lg:w-[calc(25%-18px)] lg:min-w-[calc(25%-18px)]"
                    >
                      <div className="relative h-48 w-full shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 280px, (max-width: 1024px) 50vw, 25vw"
                          className="object-contain p-6"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-2 border-t border-slate-100 p-5">
                        {etiqueta && (
                          <p className="text-xs font-bold uppercase tracking-wider text-brand-strong">
                            {etiqueta}
                          </p>
                        )}
                        <h3 className="line-clamp-2 min-h-10 text-sm font-bold leading-snug text-ink">
                          {nombreLimpio(product.name)}
                        </h3>
                        <p className="font-mono text-xs text-slate-600">
                          {product.code}
                        </p>
                        <div className="mt-auto flex gap-2 pt-3">
                          <Link
                            href={`/producto/${product.code || product.id}`}
                            className="flex min-h-11 flex-1 items-center justify-center rounded-lg bg-brand-strong px-4 text-sm font-bold text-white transition-colors hover:bg-brand-darker focus-on-brand"
                          >
                            Ver Detalles
                            <span className="sr-only"> de {product.name}</span>
                          </Link>
                          <a
                            href={enlaceWhatsApp(
                              `Hola, quiero cotizar: ${product.name} (código ${product.code})`,
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Cotizar ${product.name} por WhatsApp`}
                            className="flex min-h-11 items-center justify-center rounded-lg bg-whatsapp px-4 text-white transition-colors hover:bg-whatsapp-dark"
                          >
                            <Image src="/whatsapp-wh.png" alt="" width={18} height={18} />
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            <div className="mt-8 text-center">
              <Link
                href="/catalog"
                className="inline-block rounded-lg bg-brand-strong px-10 py-4 text-lg font-bold text-white transition-colors hover:bg-brand-navy focus-on-brand"
              >
                {`Ver Todos los Productos (${totalCatalogo > 0 ? `${totalCatalogo}+` : "···"})`}
              </Link>
            </div>
          </div>
        </section>

        <ControlStrip />

        {/* MARCAS: antes una cinta en movimiento con logos grises al 30 %.
            Ahora una fila fija; cada logo abre el catálogo filtrado. */}
        <section className="border-b border-slate-100 bg-white py-16">
          <div className="container mx-auto max-w-7xl px-6">
            <h2 className="mb-8 text-center font-display text-xl font-black uppercase tracking-tight text-ink [font-stretch:110%]">
              Marcas Compatibles
            </h2>
            <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {MARCAS.map((marca) => (
                <li key={marca}>
                  <Link
                    href={`/catalog?marca=${encodeURIComponent(marca)}`}
                    className="flex h-14 w-32 items-center justify-center rounded-lg px-3 grayscale transition hover:grayscale-0"
                    aria-label={`Ver consumibles ${marca}`}
                  >
                    <Image
                      src={`/logo/${marca.toLowerCase()}.png`}
                      alt=""
                      width={120}
                      height={40}
                      className="max-h-10 w-auto object-contain"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ¿POR QUÉ ASTA? Lista editorial: título y bajada a la izquierda,
            filas a la derecha. Cada fila lleva su canal de proceso. */}
        <section className="bg-surface-alt py-20">
          <div className="container mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="font-display text-3xl font-black uppercase tracking-tight text-ink [font-stretch:115%] lg:text-4xl">
                ¿Por Qué ASTA?
              </h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-slate-600">
                Consumibles compatibles para HP, Canon, Epson, Brother, Samsung
                y Xerox, con garantía y asesoría técnica en Venezuela desde
                1995.
              </p>
            </div>
            <ul className="divide-y divide-slate-300/70 border-y border-slate-300/70 lg:col-span-8">
              {VENTAJAS.map((v, idx) => (
                <li
                  key={v.title}
                  style={{
                    ["--canal" as string]: `var(--process-${CANALES[idx % 4]})`,
                  }}
                  className="grid gap-2 py-6 sm:grid-cols-[14rem_1fr] sm:gap-8"
                >
                  <h3 className="flex items-center gap-3 font-display text-lg font-black uppercase tracking-tight text-ink [font-stretch:110%]">
                    <span
                      aria-hidden="true"
                      className="size-3 shrink-0 rounded-sm bg-[var(--canal)]"
                    />
                    {v.title}
                  </h3>
                  <div>
                    <p className="leading-relaxed text-slate-700">{v.desc}</p>
                    <p className="mt-2 font-mono text-xs uppercase tracking-wider text-slate-600">
                      {v.points.join(" · ")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CÓMO FUNCIONAMOS: la secuencia sí informa (el paso 2 es WhatsApp),
            por eso conserva los números. */}
        <section className="bg-white py-20">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="mb-12 max-w-2xl">
              <h2 className="font-display text-3xl font-black uppercase tracking-tight text-ink [font-stretch:115%] lg:text-4xl">
                Cómo <span className="text-brand-strong">Funcionamos</span>
              </h2>
              <p className="mt-3 text-lg text-slate-600">
                De la búsqueda a la entrega, en cuatro pasos.
              </p>
            </div>

            <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {PASOS.map((item) => (
                <li
                  key={item.step}
                  style={{
                    ["--canal" as string]: `var(--process-${item.canal})`,
                  }}
                  className="rounded-2xl border border-slate-200 border-t-[var(--canal)] bg-white p-8 [border-top-width:4px]"
                >
                  <div className="mb-8 flex items-start justify-between">
                    <FeatureIcon icon={item.icon} canal={item.canal} />
                    <span className="select-none font-display text-4xl font-black leading-none text-slate-300 [font-stretch:125%]">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="mb-3 font-display text-xl font-black uppercase tracking-tight text-ink [font-stretch:110%]">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* TESTIMONIOS: en tinta a sangre, rompe la seguidilla de secciones
            claras y le da peso a lo que más convence a un revendedor. */}
        <section className="bg-[radial-gradient(140%_140%_at_50%_10%,var(--brand-strong)_0%,var(--ink)_100%)] py-20">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <ControlPatches className="mb-6 justify-center" />
              <h2 className="font-display text-3xl font-black uppercase tracking-tight text-white [font-stretch:115%] lg:text-4xl">
                Quien ya imprime con ASTA
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-100">
                Centros de copiado, imprentas y distribuidores que repiten lote
                tras lote.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {TESTIMONIOS.map((t) => (
                <figure
                  key={t.name}
                  className="rounded-xl border border-white/10 bg-ink-soft p-8"
                >
                  <div className="mb-5 flex gap-1" aria-label="5 de 5 estrellas">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        aria-hidden="true"
                        className="size-4"
                        style={{
                          color: "var(--process-y)",
                          fill: "var(--process-y)",
                        }}
                      />
                    ))}
                  </div>
                  <blockquote className="mb-6 leading-relaxed text-slate-100">
                    “{t.comment}”
                  </blockquote>
                  <figcaption>
                    <p className="font-display font-bold text-white">{t.name}</p>
                    <p className="font-mono text-xs uppercase tracking-wider text-slate-300">
                      {t.company}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* PREGUNTAS FRECUENTES: una columna legible. La mascota con lentes
            y la burbuja flotante se quitaron: el panda ya está en el hero y
            en el chat. */}
        <section className="bg-white py-20">
          <div className="container mx-auto max-w-3xl px-6">
            <h2 className="mb-4 font-display text-3xl font-black uppercase tracking-tight text-ink [font-stretch:115%] lg:text-4xl">
              Preguntas <span className="text-brand-strong">Frecuentes</span>
            </h2>
            <p className="mb-8 text-lg font-medium text-slate-600">
              Garantía, compatibilidad, entregas y condiciones para
              distribuidores.
            </p>

            <Accordion type="single" collapsible className="w-full space-y-2">
              {PREGUNTAS.map((faq, idx) => (
                <AccordionItem
                  key={faq.q}
                  value={`item-${idx}`}
                  className="rounded-xl border border-slate-200 px-5 data-[state=open]:bg-brand/5"
                >
                  <AccordionTrigger className="py-5 text-left text-lg font-bold tracking-tight text-ink hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-base leading-relaxed text-slate-600">
                    {faq.a}
                    {faq.enlace && (
                      <Link
                        href={faq.enlace.href}
                        className="mt-3 block font-bold text-brand-strong underline-offset-4 hover:underline"
                      >
                        {faq.enlace.texto} →
                      </Link>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CIERRE: termina en la acción principal (WhatsApp), no en un
            formulario. */}
        <section className="bg-surface py-20">
          <div className="container mx-auto max-w-4xl px-6">
            <div className="rounded-2xl bg-[radial-gradient(140%_140%_at_50%_15%,var(--brand-strong)_0%,var(--ink)_100%)] p-10 text-center text-white md:p-12">
              <h2 className="mb-6 font-display text-3xl font-black uppercase tracking-tight [font-stretch:115%] lg:text-4xl">
                ¿Listo para Optimizar tus Impresiones?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-xl">
                Únete a miles de clientes que ya confían en ASTA para sus
                necesidades de impresión
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href={enlaceWhatsApp(MENSAJE_GENERAL)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 rounded-lg bg-whatsapp px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-whatsapp-dark"
                >
                  <Image src="/whatsapp-wh.png" alt="" width={22} height={22} />
                  Cotizar por WhatsApp
                </a>
                <Link
                  href="/catalog"
                  className="focus-on-brand rounded-lg border-2 border-white px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-white/10"
                >
                  Ver Todos los Productos
                </Link>
              </div>

              <ul
                role="list"
                className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/20 pt-8 text-slate-100"
              >
                <li className="flex items-center gap-2">
                  <Mail aria-hidden="true" strokeWidth={1.5} className="size-4 shrink-0" />
                  <a
                    href="mailto:webstore@astavenezuela.com"
                    className="focus-on-brand hover:underline"
                  >
                    webstore@astavenezuela.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone aria-hidden="true" strokeWidth={1.5} className="size-4 shrink-0" />
                  <a href="tel:+584228008204" className="focus-on-brand hover:underline">
                    +58 (422)-8008204
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Globe aria-hidden="true" strokeWidth={1.5} className="size-4 shrink-0" />
                  <span>Toda Venezuela</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
