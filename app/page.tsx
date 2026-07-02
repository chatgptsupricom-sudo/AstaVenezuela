"use client";

import { Chatbot } from "@/components/Chatbot";
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
  ChevronLeft,
  ChevronRight,
  FileText,
  Search,
  ShieldCheck,
  ShoppingCart,
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
      <main className="bg-[#f3f5f4] overflow-hidden">
        {/* HERO SECTION */}
        <section className="relative min-h-screen bg-white flex items-center justify-center pt-28 pb-12 lg:pt-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-10%] right-[-5%] w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] bg-blue-500/5 rounded-full blur-[80px] lg:blur-[120px]" />
            <div className="absolute bottom-[5%] left-[-10%] w-[250px] lg:w-[500px] h-[250px] lg:h-[500px] bg-blue-600/5 rounded-full blur-[80px] lg:blur-[100px]" />
          </div>

          <div className="container mx-auto px-6 relative z-10 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center lg:text-left order-2 lg:order-1"
              >
                <h1 className="text-5xl md:text-7xl lg:text-[100px] font-black text-slate-900 leading-[0.9] lg:leading-[0.85] tracking-tight mb-6 lg:mb-8">
                  Impresión <br />
                  <span className="text-blue-600">Perfecta</span>
                </h1>

                <p className="text-base md:text-lg lg:text-xl text-slate-500 max-w-lg mx-auto lg:mx-0 leading-relaxed mb-8 lg:mb-10 font-medium">
                  Potencia tu productividad con consumibles de alto rendimiento.
                  Desde 1995, la marca #1 de Venezuela en nitidez y garantía.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <motion.a
                    href="/catalog"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 lg:px-10 py-4 lg:py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-xl shadow-slate-900/10 transition-all text-center"
                  >
                    Ver Catálogo
                  </motion.a>
                  <motion.a
                    href="/contact"
                    className="px-8 lg:px-10 py-4 lg:py-5 border-2 border-slate-200 text-slate-600 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all text-center"
                  >
                    Asesoría Gratuita
                  </motion.a>
                </div>

                <div className="flex justify-center lg:justify-start gap-8 lg:gap-12 mt-12 lg:mt-16 pt-8 border-t border-slate-100 text-slate-400">
                  <div>
                    <p className="text-2xl lg:text-3xl font-black text-slate-900">
                      200+
                    </p>
                    <p className="text-[10px] lg:text-xs uppercase tracking-widest font-bold">
                      Modelos
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl lg:text-3xl font-black text-slate-900">
                      30K+
                    </p>
                    <p className="text-[10px] lg:text-xs uppercase tracking-widest font-bold">
                      Clientes
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative h-[350px] md:h-[500px] lg:h-[650px] flex items-center justify-center order-1 lg:order-2"
              >
                <div className="absolute w-[80%] aspect-square bg-blue-50 rounded-full blur-3xl opacity-60" />
                <div className="relative w-full h-full z-10 flex items-center justify-center">
                  <Image
                    src="/ASTA MASCOTA.png"
                    alt="Mascota ASTA"
                    width={500}
                    height={500}
                    priority
                    className="w-auto h-full max-h-[300px] md:max-h-[450px] lg:max-h-full object-contain drop-shadow-[0_20px_50px_rgba(59,130,246,0.2)]"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="py-24 bg-[#f0f4f8] relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-300/10 rounded-full blur-[120px]" />

          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.4em] mb-4">
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
                  icon: "⭐",
                  desc: "Nuestros tóneres pasan por 12 pruebas de control antes de llegar a ti.",
                  points: [
                    "Certificación ISO 9001",
                    "Negros más profundos",
                    "Cero manchas",
                  ],
                  color: "from-blue-400/30",
                },
                {
                  title: "Máximo Rendimiento",
                  icon: "🚀",
                  desc: "Diseñados para exprimir cada gota de tinta y gramo de polvo.",
                  points: [
                    "+20% páginas extra",
                    "Carga ultra-rápida",
                    "Ahorro energético",
                  ],
                  color: "from-cyan-400/30",
                },
                {
                  title: "Garantía Total",
                  icon: "✅",
                  desc: "Si el producto falla, nosotros respondemos. Sin preguntas incómodas.",
                  points: [
                    "Soporte 24/7",
                    "Cambio inmediato",
                    "Protección de equipo",
                  ],
                  color: "from-emerald-400/30",
                },
                {
                  title: "Stock Inmediato",
                  icon: "📦",
                  desc: "El inventario más grande del país a tu disposición.",
                  points: ["Envío en 24h", "200+ Modelos", "Logística propia"],
                  color: "from-slate-400/30",
                },
                {
                  title: "Precios de Fábrica",
                  icon: "💰",
                  desc: "Eliminamos intermediarios para darte el mejor costo por página.",
                  points: [
                    "Planes corporativos",
                    "Descuentos por volumen",
                    "Crédito aliado",
                  ],
                  color: "from-indigo-400/30",
                },
                {
                  title: "Compatibilidad",
                  icon: "🔧",
                  desc: "Integración perfecta. Tu impresora no notará la diferencia.",
                  points: [
                    "Chips de última gen",
                    "Ajuste milimétrico",
                    "Update friendly",
                  ],
                  color: "from-rose-400/30",
                },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -15 }}
                  className="group relative p-12 rounded-[3.5rem] transition-all duration-700 bg-white/5 backdrop-blur-3xl border-t border-l border-white/60 border-b border-r border-white/10 shadow-[25px_25px_50px_rgba(0,0,0,0.03),inset_0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_50px_100px_-20px_rgba(59,130,246,0.15),inset_0_0_30px_rgba(255,255,255,0.4)] overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  </div>
                  <div
                    className={`absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br ${feature.color} to-transparent blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                  />
                  <div className="flex items-center gap-6 mb-8 relative z-10">
                    <div className="w-16 h-16 bg-white/30 backdrop-blur-2xl rounded-2xl flex items-center justify-center text-3xl shadow-[inset_0_0_15px_rgba(255,255,255,0.5)] border border-white/40 group-hover:rotate-[10deg] transition-transform duration-500">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-medium mb-8 relative z-10">
                    {feature.desc}
                  </p>
                  <ul className="space-y-3 relative z-10">
                    {feature.points.map((point, pIdx) => (
                      <li
                        key={pIdx}
                        className="flex items-center gap-3 text-sm font-bold text-slate-500 group-hover:text-blue-600 transition-colors"
                      >
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="absolute bottom-6 right-10 text-xs font-black text-blue-600/20 uppercase tracking-widest group-hover:text-blue-600/40 transition-colors">
                    ASTA
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FEATURED PRODUCTS SECTION - INTUITIVE INTERACTIVE CAROUSEL */}
        <section className="py-20 bg-gradient-to-b from-white to-[#f3f5f4]">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-black text-[#0b63cd] mb-4">
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
                    className="bg-white rounded-3xl h-[440px] w-full animate-pulse border border-gray-100 shadow-sm"
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
                  className="absolute left-4 top-[50%] -translate-y-1/2 z-30 bg-white border border-slate-100 p-4 rounded-full shadow-xl text-[#0b63cd] hover:bg-[#0b63cd] hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center"
                >
                  <ChevronLeft size={24} strokeWidth={3} />
                </button>

                {/* 🎛️ BOTÓN DERECHO */}
                <button
                  onClick={() => scroll("right")}
                  aria-label="Siguiente producto"
                  className="absolute right-4 top-[50%] -translate-y-1/2 z-30 bg-white border border-slate-100 p-4 rounded-full shadow-xl text-[#0b63cd] hover:bg-[#0b63cd] hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center"
                >
                  <ChevronRight size={24} strokeWidth={3} />
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
                      className="bg-white rounded-3xl overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(11,99,205,0.08)] transition-all duration-300 border border-gray-100/80 flex flex-col h-[460px] w-[280px] min-w-[280px] md:w-[calc(50%-12px)] md:min-w-[calc(50%-12px)] lg:w-[calc(25%-18px)] lg:min-w-[calc(25%-18px)] flex-shrink-0 snap-start"
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
                          className="object-contain p-4 hover:scale-105 transition-transform duration-300"
                          unoptimized={product.image.startsWith("data:")}
                        />
                      </div>

                      {/* Cuerpo de Información */}
                      <div className="p-6 flex-1 flex flex-col justify-between bg-white rounded-b-3xl">
                        <div className="space-y-2">
                          <p className="text-[10px] text-[#44abff] font-bold uppercase tracking-wider">
                            {product.category || "Consumibles"}
                          </p>
                          <h3 className="text-sm font-bold text-[#0b63cd] line-clamp-2 leading-snug min-h-[40px]">
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
                              className="block bg-[#44abff] text-white w-full py-3 rounded-xl text-xs font-bold hover:bg-[#0b63cd] transition-colors shadow-sm text-center cursor-pointer"
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
                className="inline-block px-10 py-4 bg-[#0b63cd] text-white rounded-lg font-bold text-lg hover:bg-[#0b2d4d] transition-colors"
              >
                Ver Todos los Productos (200+)
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* BRANDS SECTION */}
        <section className="py-24 bg-white border-y border-slate-50 overflow-hidden">
          <div className="container mx-auto px-6 mb-16">
            <h2 className="text-center text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-4">
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
              <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.6em] mb-4">
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
              <div className="hidden lg:block absolute top-[40%] left-0 w-full h-[2px] bg-slate-100 z-0">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-blue-600 via-sky-400 to-yellow-400"
                />
              </div>

              {[
                {
                  step: "01",
                  title: "Selecciona",
                  description:
                    "Explora nuestro catálogo elite y elige la ingeniería de precisión que tu impresora merece.",
                  icon: <Search className="w-8 h-8" />,
                  color: "from-blue-500 to-blue-700",
                  accent: "bg-blue-600",
                },
                {
                  step: "02",
                  title: "Consulta",
                  description:
                    "Valida especificaciones y compatibilidad total con el apoyo de nuestros expertos técnicos.",
                  icon: <FileText className="w-8 h-8" />,
                  color: "from-sky-400 to-sky-600",
                  accent: "bg-sky-500",
                },
                {
                  step: "03",
                  title: "Ordena",
                  description:
                    "Gestión de pedido ágil con logística prioritaria para que tu flujo de trabajo nunca se detenga.",
                  icon: <ShoppingCart className="w-8 h-8" />,
                  color: "from-yellow-400 to-yellow-600",
                  accent: "bg-yellow-500",
                },
                {
                  step: "04",
                  title: "Disfruta",
                  description:
                    "Recibe calidad certificada ASTA y experimenta la nitidez superior de la marca líder.",
                  icon: <ShieldCheck className="w-8 h-8" />,
                  color: "from-blue-600 to-sky-500",
                  accent: "bg-blue-600",
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
                  <div className="h-full p-10 rounded-[3rem] bg-slate-50/50 border border-slate-100 backdrop-blur-md transition-all duration-500 hover:bg-white hover:border-blue-200 hover:-translate-y-4 shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(11,99,205,0.15)]">
                    <div className="flex justify-between items-start mb-10">
                      <div
                        className={`p-4 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}
                      >
                        {item.icon}
                      </div>
                      <span
                        className="text-5xl font-black transition-colors duration-500 select-none group-hover:opacity-50"
                        style={{ color: "#cdcecf" }}
                      >
                        {item.step}
                      </span>
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 leading-relaxed font-medium text-sm group-hover:text-slate-600 transition-colors">
                      {item.description}
                    </p>
                    <div className="mt-8 flex items-center gap-2">
                      <div
                        className={`w-8 h-1.5 ${item.accent} rounded-full group-hover:w-full transition-all duration-700 ease-in-out`}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="py-20 bg-[#f3f5f4]">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-black text-[#0b63cd] mb-4">
                Lo Que Dicen Nuestros Clientes
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Descubre por qué miles de clientes confían en ASTA
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
                  className="bg-white rounded-lg p-8 shadow-md border border-gray-100"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">
                    "{testimonial.comment}"
                  </p>
                  <div>
                    <p className="font-bold text-[#0b63cd]">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">
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
                  <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-none">
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

        {/* MASCOT SECTION */}
        <section className="py-20 bg-gradient-to-r from-[#44abff] to-[#0b63cd]">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
                  Conoce a Nuestro Amigo Panda
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  Desde el 95, el panda ASTA ha sido símbolo de amabilidad,
                  confiabilidad y calidad en la familia de consumibles. ¡Es
                  nuestro embajador favorito!
                </p>
                <div className="space-y-4">
                  {[
                    "🎯 Experto en soluciones de impresión",
                    "💡 Siempre trae las mejores ideas",
                    "🤝 Tu socio de confianza",
                    "🌟 Garantía ASTA en cada producto",
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 text-white"
                    >
                      <span className="text-2xl">{item.split(" ")[0]}</span>
                      <span>{item.substring(3)}</span>
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
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center bg-gradient-to-r from-[#44abff] to-[#0b63cd] rounded-2xl p-12 text-white"
            >
              <h2 className="text-4xl lg:text-5xl font-black mb-6">
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
                  className="px-10 py-4 bg-white text-[#0b63cd] rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-block"
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
                <p className="text-white/80">
                  📧 info@asta.com | 📞 +58 (0) 212 XXX-XXXX | 🌐
                  www.asta.com.ve
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <Chatbot />

        {/* FOOTER */}
        <footer className="bg-[#0b63cd] text-white py-16">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ASTA%20LOGO-vtQAMg0Q2u2aytIUDPgrmSZqP65VBq.png"
                  alt="ASTA"
                  className="h-12 w-auto mb-4 filter brightness-0 invert"
                />
                <p className="text-white/80">
                  La marca número #1 en consumibles para impresoras desde 1995.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Productos</h4>
                <ul className="space-y-2 text-white/80">
                  <li>
                    <a href="#" className="hover:text-white">
                      Tóneres
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Tintas
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Accesorios
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Ofertas
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Empresa</h4>
                <ul className="space-y-2 text-white/80">
                  <li>
                    <a href="#" className="hover:text-white">
                      Sobre Nosotros
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Distribuidor
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Contacto
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Síguenos</h4>
                <ul className="space-y-2 text-white/80">
                  <li>
                    <a href="#" className="hover:text-white">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      YouTube
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/20 pt-8 text-center text-white/80">
              <p>
                &copy; 2026 ASTA - Todos los derechos reservados | Política de
                Privacidad | Términos de Servicio
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
