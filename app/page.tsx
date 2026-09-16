"use client";

import { Banner } from "@/components/Banner";
import { Chatbot } from "@/components/Chatbot";
import { FeatureIcon } from "@/components/FeatureIcon";
import { ControlPatches, ControlStrip } from "@/components/ControlStrip";
import { Navbar } from "@/components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BRANDS } from "@/lib/products";
import { motion } from "framer-motion";
import {
  Award,
  ChevronLeft,
  ChevronRight,
  Crosshair,
  FileText,
  Gauge,
  Globe,
  Handshake,
  Lightbulb,
  Mail,
  Package,
  Phone,
  Search,
  ShieldCheck,
  ShoppingCart,
  Star,
  Wallet,
  Wrench,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const MascotScene = dynamic(
  () =>
    import("@/components/MascotScene").then((mod) => ({
      default: mod.MascotScene,
    })),
  {
    ssr: false,
  },
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const PRODUCT_PLACEHOLDER = "/Chatbot2.jpeg";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Tóneres HP");
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // 🟢 Ref para controlar el scroll del carrusel por botones
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        const res = await fetch("/api/productos/rapidito");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();

        // 🎲 ALEATORIEDAD: Desordenamos el array completo para que las primeras posiciones cambien siempre
        const randomizedData = [...data].sort(() => Math.random() - 0.5);

        setProducts(randomizedData);
      } catch (error) {
        console.error("Error cargando productos destacados:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadFeaturedProducts();
  }, []);

  // 🔄 AUTO-PLAY: Movimiento automatizado cada 3.5 segundos (se detiene si el mouse está encima)
  useEffect(() => {
    if (isLoading || products.length === 0 || isHovered) return;

    // El CSS global ya frena transition/animate-*, pero un setInterval que
    // llama a scrollTo() no es CSS: sigue moviendo la pagina aunque el
    // sistema pida "reducir movimiento". Se respeta aqui explicitamente.
    const prefiereMenosMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefiereMenosMovimiento) return;

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        // Si llegó al final, vuelve al inicio; si no, avanza el tamaño de una tarjeta
        const targetScroll =
          scrollLeft + clientWidth >= scrollWidth - 10 ? 0 : scrollLeft + 320;

        carouselRef.current.scrollTo({
          left: targetScroll,
          behavior: "smooth",
        });
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isLoading, products, isHovered]);

  // 🕹️ LÓGICA DE LOS BOTONES: Desplazamiento manual
  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const offset = direction === "left" ? -320 : 320;
      carouselRef.current.scrollBy({
        left: offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-surface overflow-hidden">
        {/* HERO SECTION */}
        <section className="relative bg-white pt-28 pb-0 lg:pt-24">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Bloque de titular */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="order-2 lg:order-1 lg:col-span-7"
              >
                <div className="mb-7 flex items-center gap-3">
                  <ControlPatches />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                    Tóner · Tintas · Drums · Chips
                  </span>
                </div>

                <h1 className="font-display text-[clamp(2.75rem,7vw,5.5rem)] font-black uppercase leading-[0.86] tracking-[-0.02em] text-ink [font-stretch:125%]">
                  Impresion <span className="text-[#155DFC]">Perfecta</span>
                </h1>

                <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-600">
                  Tóner, tintas, drums y chips compatibles con las impresoras
                  que ya tienes. Sin cambiar de equipo ni de proveedor.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/catalog"
                    className="rounded-lg bg-ink px-8 py-4 text-center font-display font-bold text-white transition-colors hover:bg-brand-strong focus-on-brand"
                  >
                    Ver el catálogo
                  </Link>
                  <Link
                    href="/contact"
                    className="rounded-lg border-2 border-slate-200 px-8 py-4 text-center font-display font-bold text-ink transition-colors hover:border-ink"
                  >
                    Hablar con un asesor
                  </Link>
                </div>
              </motion.div>

              {/* Mascota */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="relative order-1 flex items-end justify-center lg:order-2 lg:col-span-5"
              >
                <Image
                  src="/ASTA MASCOTA.png"
                  alt="Mascota de ASTA"
                  width={500}
                  height={500}
                  priority
                  sizes="(max-width: 1024px) 60vw, 420px"
                  className="relative h-auto max-h-[280px] w-auto object-contain md:max-h-[380px] lg:max-h-[460px]"
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
                  dato={products.length > 0 ? `${products.length}+` : "···"}
                  titulo="Modelos compatibles"
                  descripcion="HP, Canon, Epson, Brother, Samsung y Xerox. Busca por código y comprueba el tuyo."
                  href="/catalog"
                  accion="Buscar mi modelo"
                  indice={0}
                />
                <Banner
                  canal="m"
                  dato="30K+"
                  titulo="Clientes atendidos"
                  descripcion="Oficinas, centros de copiado y distribuidores en toda Venezuela."
                  href="/about"
                  accion="Conocer ASTA"
                  indice={1}
                />
                <Banner
                  canal="y"
                  dato="1995"
                  titulo="Años en el mercado"
                  descripcion="Tres décadas de respaldo, stock y asesoría técnica en Venezuela."
                  href="/contact"
                  accion="Pedir asesoría"
                  indice={2}
                />
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="relative bg-surface-alt py-24">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-brand-strong">
                Ecosistema de Calidad
              </h2>
              <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tighter">
                ¿Por Qué ASTA?
              </h3>
              <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
                No solo vendemos consumibles; encapsulamos ingeniería de
                precisión en cada cartucho para que tu flujo de trabajo nunca se
                detenga.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
            >
              {[
                {
                  title: "Calidad Premium",
                  icon: Award,
                  desc: "Nuestros tóneres pasan por 12 pruebas de control antes de llegar a ti.",
                  points: [
                    "Certificación ISO 9001",
                    "Negros más profundos",
                    "Cero manchas",
                  ],
                },
                {
                  title: "Máximo Rendimiento",
                  icon: Gauge,
                  desc: "Diseñados para exprimir cada gota de tinta y gramo de polvo.",
                  points: [
                    "+20% páginas extra",
                    "Carga ultra-rápida",
                    "Ahorro energético",
                  ],
                },
                {
                  title: "Garantía Total",
                  icon: ShieldCheck,
                  desc: "Si el producto falla, nosotros respondemos. Sin preguntas incómodas.",
                  points: [
                    "Soporte 24/7",
                    "Cambio inmediato",
                    "Protección de equipo",
                  ],
                },
                {
                  title: "Stock Inmediato",
                  icon: Package,
                  desc: "El inventario más grande del país a tu disposición.",
                  points: [
                    "Envío en 24h",
                    products.length > 0
                      ? `${products.length}+ Modelos`
                      : "Amplio stock",
                    "Logística propia",
                  ],
                },
                {
                  title: "Precios de Fábrica",
                  icon: Wallet,
                  desc: "Eliminamos intermediarios para darte el mejor costo por página.",
                  points: [
                    "Planes corporativos",
                    "Descuentos por volumen",
                    "Crédito aliado",
                  ],
                },
                {
                  title: "Compatibilidad",
                  icon: Wrench,
                  desc: "Integración perfecta. Tu impresora no notará la diferencia.",
                  points: [
                    "Chips de última gen",
                    "Ajuste milimétrico",
                    "Update friendly",
                  ],
                },
              ].map((feature, idx) => {
                // Son 6 tarjetas y solo 4 canales: se repiten en el mismo
                // orden de la tira de control, no hay una correspondencia
                // real tarjeta-canal que reclamar (a diferencia del código
                // de producto, que sí encierra su color de tinta real).
                const canal = (["c", "m", "y", "k"] as const)[idx % 4];
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ y: -6 }}
                    style={{ ["--canal" as string]: `var(--process-${canal})` }}
                    className="group rounded-xl border border-[var(--canal)]/20 bg-[var(--canal)]/[0.05] p-10 transition-all duration-300 hover:border-[var(--canal)]/45 hover:bg-[var(--canal)]/[0.1] hover:shadow-lg"
                  >
                    <div className="flex items-center gap-6 mb-8">
                      <FeatureIcon icon={feature.icon} canal={canal} />
                      <h3 className="font-display text-2xl font-black uppercase tracking-tight text-ink [font-stretch:110%]">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed font-medium mb-8">
                      {feature.desc}
                    </p>
                    <ul className="space-y-3">
                      {feature.points.map((point, pIdx) => (
                        <li
                          key={pIdx}
                          className="flex items-center gap-3 text-sm font-bold text-slate-500"
                        >
                          <span
                            aria-hidden="true"
                            className="size-1.5 shrink-0 rounded-full bg-[var(--canal)]"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* FEATURED PRODUCTS SECTION - INTUITIVE INTERACTIVE CAROUSEL */}
        <section className="py-20 bg-gradient-to-b from-white to-surface">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-4xl lg:text-5xl font-black uppercase tracking-tight text-ink mb-4 [font-stretch:115%]">
                Productos Destacados
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Conoce nuestros productos más populares y mejor valorados
              </p>
            </motion.div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="bg-white rounded-xl h-[440px] w-full animate-pulse border border-gray-100 shadow-sm"
                  />
                ))}
              </div>
            ) : (
              /* Contenedor relativo para alojar los botones sobre las tarjetas */
              <div
                className="relative w-full group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* 🎛️ BOTÓN IZQUIERDO */}
                <button
                  onClick={() => scroll("left")}
                  aria-label="Anterior producto"
                  className="absolute left-2 md:left-4 top-[50%] -translate-y-1/2 z-30 flex items-center justify-center rounded-full border border-slate-100 bg-white p-3 md:p-4 text-brand-strong opacity-70 shadow-xl transition-all hover:bg-brand-strong hover:text-white hover:opacity-100 md:opacity-0 md:group-hover:opacity-100"
                >
                  <ChevronLeft size={22} strokeWidth={2} />
                </button>

                {/* 🎛️ BOTÓN DERECHO */}
                <button
                  onClick={() => scroll("right")}
                  aria-label="Siguiente producto"
                  className="absolute right-2 md:right-4 top-[50%] -translate-y-1/2 z-30 flex items-center justify-center rounded-full border border-slate-100 bg-white p-3 md:p-4 text-brand-strong opacity-70 shadow-xl transition-all hover:bg-brand-strong hover:text-white hover:opacity-100 md:opacity-0 md:group-hover:opacity-100"
                >
                  <ChevronRight size={22} strokeWidth={2} />
                </button>

                {/* 🔄 CONTENEDOR OPTIMIZADO: Aseguramos ancho completo y comportamiento fluido */}
                <motion.div
                  ref={carouselRef}
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-row w-full gap-6 overflow-x-auto lg:overflow-x-hidden snap-x snap-mandatory pb-8 pt-4 px-2 scroll-smooth scrollbar-none justify-start lg:justify-between items-center"
                  style={{ scrollbarWidth: "none" }}
                >
                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={itemVariants}
                      whileHover={{ y: -10 }}
                      /* ⚡ SOLUCIÓN AQUÍ: Usamos min-w y w combinados con porcentajes fijos basados en la cantidad de columnas deseada */
                      className="bg-white rounded-xl overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(11,99,205,0.08)] transition-all duration-300 border border-gray-100/80 flex flex-col h-[460px] w-[280px] min-w-[280px] md:w-[calc(50%-12px)] md:min-w-[calc(50%-12px)] lg:w-[calc(25%-18px)] lg:min-w-[calc(25%-18px)] flex-shrink-0 snap-start"
                    >
                      {/* Contenedor de la Imagen */}
                      <div className="relative h-48 w-full bg-white flex items-center justify-center p-6 flex-shrink-0">
                        <Image
                          src={
                            product.image &&
                            product.image.trim() !== "" &&
                            !product.image.includes("placeholder")
                              ? product.image
                              : PRODUCT_PLACEHOLDER
                          }
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-contain p-4 hover:scale-105 transition-transform duration-300"
                          unoptimized={product.image.startsWith("data:")}
                        />
                      </div>

                      {/* Cuerpo de Información */}
                      <div className="p-6 flex-1 flex flex-col justify-between bg-white rounded-b-3xl">
                        <div className="space-y-2">
                          <p className="text-[10px] text-brand font-bold uppercase tracking-wider">
                            {product.category || "Consumibles"}
                          </p>
                          <h3 className="text-sm font-bold text-brand-strong line-clamp-2 leading-snug min-h-[40px]">
                            {product.name}
                          </h3>
                          <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-gray-50 flex justify-center w-full">
                          <Link
                            href={`/producto/${product.code || product.id}`}
                            passHref
                            className="w-full"
                          >
                            <motion.span
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="block bg-brand-strong text-white w-full py-3 rounded-xl text-xs font-bold hover:bg-brand-navy transition-colors shadow-sm text-center cursor-pointer"
                            >
                              Ver Detalles
                            </motion.span>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <motion.a
                href="/catalog"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-10 py-4 bg-brand-strong text-white rounded-lg font-bold text-lg hover:bg-brand-navy transition-colors"
              >
                {`Ver Todos los Productos (${products.length > 0 ? `${products.length}+` : "···"})`}
              </motion.a>
            </motion.div>
          </div>
        </section>

        <ControlStrip />

        {/* BRANDS SECTION */}
        <section className="py-24 bg-white border-y border-slate-50 overflow-hidden">
          <div className="container mx-auto px-6 mb-16">
            <h2 className="mb-4 text-center font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
              Marcas Compatibles
            </h2>
          </div>
          <div className="relative flex group">
            <motion.div
              className="flex whitespace-nowrap gap-20 items-center py-4"
              animate={{ x: [0, -1000] }}
              transition={{
                x: { repeat: Infinity, duration: 25, ease: "linear" },
              }}
            >
              {[...BRANDS, ...BRANDS].map((brand, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center w-32 h-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                >
                  <Image
                    src={`/logo/${brand.name.toLowerCase()}.png`}
                    alt={brand.name}
                    width={120}
                    height={40}
                    className="object-contain"
                  />
                </div>
              ))}
            </motion.div>
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-10" />
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="py-32 relative overflow-hidden bg-white">
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
            <div className="absolute -top-[10%] -right-[5%] w-[600px] h-[600px] bg-sky-100 rounded-full blur-[120px]" />
            <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-yellow-50 rounded-full blur-[100px]" />
          </div>

          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-brand-strong">
                Ecosistema Logístico
              </h2>
              <h3 className="text-5xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tighter leading-none">
                Cómo <span className="text-blue-600">Funcionamos.</span>
              </h3>
              <div className="w-16 h-1.5 bg-yellow-400 mx-auto rounded-full mb-8" />
              <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                Un proceso optimizado y transparente para garantizar la
                excelencia en cada entrega.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {/* La linea guia recorre los mismos tres canales que las
                  tarjetas: es la tira de control estirada en horizontal. */}
              <div className="hidden lg:block absolute top-[40%] left-0 w-full h-[2px] bg-slate-100 z-0">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-[var(--process-c)] via-[var(--process-m)] to-[var(--process-y)]"
                />
              </div>

              {[
                {
                  step: "01",
                  title: "Selecciona",
                  description:
                    "Explora nuestro catalogo elite y elige la ingenieria de precision que tu impresora merece.",
                  icon: Search,
                  canal: "c",
                },
                {
                  step: "02",
                  title: "Consulta",
                  description:
                    "Valida especificaciones y compatibilidad total con el apoyo de nuestros expertos tecnicos.",
                  icon: FileText,
                  canal: "m",
                },
                {
                  step: "03",
                  title: "Ordena",
                  description:
                    "Gestion de pedido agil con logistica prioritaria para que tu flujo de trabajo nunca se detenga.",
                  icon: ShoppingCart,
                  canal: "y",
                },
                {
                  step: "04",
                  title: "Disfruta",
                  description:
                    "Recibe calidad certificada ASTA y experimenta la nitidez superior de la marca lider.",
                  icon: ShieldCheck,
                  canal: "k",
                },
              ].map((item, idx) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  className="group relative z-10"
                >
                  {/* El color de canal entra por una variable CSS, no por una
                      clase armada con template string: Tailwind escanea el
                      codigo en build y una clase como bg-process-${canal}
                      no existe tal cual en ningun archivo, asi que desaparece
                      del CSS compilado. Con la variable, las clases de abajo
                      (bg-[var(--canal)]/8, etc.) son literales fijos y el
                      valor que toma cada tarjeta llega por style. */}
                  <div
                    style={{
                      ["--canal" as string]: `var(--process-${item.canal})`,
                    }}
                    className="h-full rounded-[3rem] border border-[var(--canal)]/20 bg-[var(--canal)]/[0.06] p-10 backdrop-blur-md transition-all duration-500 hover:-translate-y-4 hover:border-[var(--canal)]/45 hover:bg-[var(--canal)]/[0.12] hover:shadow-[0_40px_80px_-20px_var(--canal)]"
                  >
                    <div className="flex justify-between items-start mb-10">
                      <FeatureIcon
                        icon={item.icon}
                        canal={item.canal as "c" | "m" | "y" | "k"}
                      />
                      <span className="select-none font-display text-5xl font-black leading-none text-slate-200 transition-colors duration-500 group-hover:text-slate-300 [font-stretch:125%]">
                        {item.step}
                      </span>
                    </div>
                    <h4 className="mb-4 font-display text-2xl font-black uppercase tracking-tight text-ink [font-stretch:110%]">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 leading-relaxed font-medium text-sm group-hover:text-slate-600 transition-colors">
                      {item.description}
                    </p>
                    <div className="mt-8">
                      <span
                        aria-hidden="true"
                        className="block h-1.5 w-10 bg-[var(--canal)] transition-all duration-700 ease-in-out group-hover:w-full"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        {/* En tinta a sangre: rompe la seguidilla de secciones claras y le da
            peso al testimonio, que es lo que más convence a un comprador.
            Mismo brillo radial que las cabeceras (--brand-strong hacia
            --ink), con el foco centrado arriba en vez de a la izquierda
            porque aquí el título y la bajada están centrados, no alineados
            a un lado. Las tarjetas de abajo quedan en bg-ink-soft plano,
            igual que el input de las cabeceras: una capa "elevada" sobre
            el fondo con brillo, no algo que necesite su propio degradado. */}
        <section className="bg-[radial-gradient(140%_140%_at_50%_10%,var(--brand-strong)_0%,var(--ink)_100%)] py-24">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <ControlPatches className="mb-6 justify-center" />
              <h2 className="font-display text-4xl font-black uppercase tracking-tight text-white lg:text-5xl [font-stretch:115%]">
                Quien ya imprime con ASTA
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
                Centros de copiado, imprentas y distribuidores que repiten lote
                tras lote.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  name: "Carlos Rodríguez",
                  company: "Copias Rápidas SRL",
                  comment:
                    "Los tóneres ASTA tienen la mejor relación calidad-precio. Nuestros clientes notaron inmediatamente la mejora en las impresiones.",
                  rating: 5,
                },
                {
                  name: "María López",
                  company: "Imprenta Digital Plus",
                  comment:
                    "Excelente servicio y productos de calidad. El equipo de ASTA siempre está disponible para ayudarnos.",
                  rating: 5,
                },
                {
                  name: "Juan Pérez",
                  company: "Centro de Impresión Moderno",
                  comment:
                    "Llevar ASTA como distribuidor ha sido la mejor decisión para mi negocio. Stock garantizado y precios competitivos.",
                  rating: 5,
                },
              ].map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="rounded-xl border border-white/10 bg-ink-soft p-8"
                >
                  <div
                    className="mb-5 flex gap-1"
                    aria-label={`${testimonial.rating} de 5 estrellas`}
                  >
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
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
                  <p className="mb-6 leading-relaxed text-slate-200">
                    "{testimonial.comment}"
                  </p>
                  <div>
                    <p className="font-display font-bold text-white">
                      {testimonial.name}
                    </p>
                    <p className="font-mono text-xs uppercase tracking-wider text-slate-400">
                      {testimonial.company}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-50 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />
          </div>

          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center lg:text-left"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                    Centro de Ayuda
                  </div>
                  <h2 className="mb-6 font-display text-4xl font-black uppercase leading-none tracking-tight text-ink lg:text-6xl [font-stretch:115%]">
                    Preguntas <span className="text-blue-600">Frecuentes.</span>
                  </h2>
                  <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto lg:mx-0">
                    Todo lo que necesitas saber sobre la marca líder en
                    consumibles de impresión en Venezuela. Resolviendo tus dudas
                    con precisión técnica.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-[2.5rem] p-4 md:p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-slate-100"
                >
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full space-y-3"
                  >
                    {[
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
                        a: "Buscamos aliados estratégicos. Puedes iniciar tu solicitud escribiéndonos a nuestro correo oficial.",
                      },
                    ].map((faq, idx) => (
                      <AccordionItem
                        key={idx}
                        value={`item-${idx}`}
                        className="border-none px-4 md:px-6 py-1 rounded-2xl transition-all duration-300 data-[state=open]:bg-blue-50/50"
                      >
                        <AccordionTrigger className="text-left hover:no-underline py-4 text-slate-900 font-bold text-lg md:text-xl tracking-tight">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-500 text-base md:text-lg leading-relaxed pb-6 font-medium">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              </div>

              <div className="lg:col-span-6 flex justify-center items-center relative">
                <div className="absolute w-[120%] aspect-square bg-blue-100/40 rounded-full blur-[120px]" />
                <div className="relative z-10 w-full max-w-[550px] lg:max-w-none">
                  <Image
                    src="/MascotaLentes.png"
                    alt="ASTA Panda Mascot"
                    width={500}
                    height={500}
                    className="object-contain drop-shadow-[0_45px_80px_rgba(11,99,205,0.2)] lg:scale-125"
                    priority
                  />
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute bottom-10 left-0 lg:-left-10 bg-white p-5 rounded-3xl shadow-2xl border border-slate-50 hidden md:block"
                  >
                    <p className="text-blue-600 font-black text-2xl">100%</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      Garantizado
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ControlStrip />

        {/* MASCOT SECTION */}
        <section className="py-20 bg-gradient-to-r from-brand to-brand-strong">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="mb-6 font-display text-4xl font-black uppercase tracking-tight text-white lg:text-5xl [font-stretch:115%]">
                  Conoce a Nuestro Amigo Panda
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  Desde el 95, el panda ASTA ha sido símbolo de amabilidad,
                  confiabilidad y calidad en la familia de consumibles. ¡Es
                  nuestro embajador favorito!
                </p>
                <div className="space-y-4">
                  {[
                    {
                      icon: Crosshair,
                      texto: "Experto en soluciones de impresión",
                    },
                    {
                      icon: Lightbulb,
                      texto: "Siempre trae las mejores ideas",
                    },
                    { icon: Handshake, texto: "Tu socio de confianza" },
                    {
                      icon: ShieldCheck,
                      texto: "Garantía ASTA en cada producto",
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 text-white"
                    >
                      <FeatureIcon icon={item.icon} tono="oscuro" tamano="sm" />
                      <span>{item.texto}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative h-96 flex items-center justify-center"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ASTA%20MASCOTA-hveQftSuOf6A9CH7k6WgmcCgg9meGz.png"
                    alt="ASTA Panda"
                    width={300}
                    height={300}
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        {/* Mismo brillo radial en tinta que testimonios y las cabeceras,
            foco centrado arriba porque el título también está centrado. */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="rounded-xl bg-[radial-gradient(140%_140%_at_50%_15%,var(--brand-strong)_0%,var(--ink)_100%)] p-12 text-center text-white"
            >
              <h2 className="mb-6 font-display text-4xl font-black uppercase tracking-tight lg:text-5xl [font-stretch:115%]">
                ¿Listo para Optimizar tus Impresiones?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Únete a miles de clientes que ya confían en ASTA para sus
                necesidades de impresión
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/catalog"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-white text-brand-strong rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-block"
                >
                  Ver Todos los Productos
                </motion.a>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white/10 transition-colors inline-block"
                >
                  Contactar Ventas
                </motion.a>
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <ul
                  role="list"
                  className="flex flex-wrap items-center gap-x-8 gap-y-3 text-white/80"
                >
                  <li className="flex items-center gap-2">
                    <Mail
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="size-4 shrink-0"
                    />
                    <a href="mailto:info@asta.com" className="hover:underline">
                      info@asta.com
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="size-4 shrink-0"
                    />
                    <span>+58 (0) 212 XXX-XXXX</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Globe
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="size-4 shrink-0"
                    />
                    <span>www.asta.com.ve</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        <Chatbot />

        {/* FOOTER */}
        {/* Foco arriba-izquierda como las cabeceras: el contenido del pie
            (logo, columnas) empieza alineado a ese lado, no centrado. */}
        <ControlStrip alto="h-1.5" />
        <footer className="bg-[radial-gradient(140%_140%_at_12%_15%,var(--brand-strong)_0%,var(--ink)_100%)] py-14 text-white">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
              <div className="max-w-sm">
                <Image
                  src="/ASTA LOGO.png"
                  alt="ASTA"
                  width={140}
                  height={40}
                  className="mb-4 h-9 w-auto object-contain brightness-0 invert"
                />
                <p className="text-slate-300">
                  Tóner, tintas, drums y chips que rinden lo que dice la caja.
                  Distribuyendo en Venezuela desde 1995.
                </p>
              </div>

              <nav aria-label="Navegación del pie de página">
                <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-300">
                  Navegación
                </h4>
                <ul className="flex flex-col gap-3 text-slate-300 sm:flex-row sm:gap-8">
                  <li>
                    <Link href="/" className="hover:text-white">
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link href="/catalog" className="hover:text-white">
                      Catálogo
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-white">
                      Sobre Nosotros
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white">
                      Contacto
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="mt-10 border-t border-white/10 pt-8 text-center text-sm text-slate-300">
              <p>
                &copy; {new Date().getFullYear()} ASTA. Todos los derechos
                reservados.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
