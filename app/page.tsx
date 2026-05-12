"use client";

import { Navbar } from "@/components/Navbar";
import { BRANDS, FEATURED_PRODUCTS } from "@/lib/products";
import { motion } from "framer-motion";
import { FileText, Search, ShieldCheck, ShoppingCart } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

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
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Tóneres HP");

  return (
    <>
      <Navbar />
      <main className="bg-[#f3f5f4] overflow-hidden">
        {/* HERO SECTION RENOVADO - ATRACTIVO Y MINIMALISTA */}
        <section className="relative min-h-screen bg-white flex items-center justify-center pt-20 overflow-hidden">
          {/* Fondo sutil con gradiente suave y formas orgánicas */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[5%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px]" />
          </div>

          <div className="container mx-auto px-6 relative z-10 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Lado Izquierdo: Contenido con jerarquía moderna */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center lg:text-left"
              >
                {/* <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-widest uppercase mb-8"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  Calidad Premium Certificada
                </motion.div> */}

                <h1 className="text-6xl lg:text-[100px] font-black text-slate-900 leading-[0.85] tracking-tight mb-8">
                  Impresión <br />
                  <span className="text-blue-600">Perfecta.</span>
                </h1>

                <p className="text-lg lg:text-xl text-slate-500 max-w-lg mx-auto lg:mx-0 leading-relaxed mb-10">
                  Potencia tu productividad con consumibles de alto rendimiento.
                  Desde 1995, la marca #1 de Venezuela en nitidez y garantía.
                </p>

                <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                  <motion.a
                    href="/catalog"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-slate-900/20 transition-all text-center"
                  >
                    Ver Catálogo
                  </motion.a>
                  <motion.a
                    href="/contact"
                    whileHover={{
                      backgroundColor: "#f8fafc",
                      borderColor: "#cbd5e1",
                    }}
                    className="px-10 py-5 border-2 border-slate-200 text-slate-600 rounded-2xl font-bold text-lg transition-all text-center"
                  >
                    Asesoría Gratuita
                  </motion.a>
                </div>

                {/* Stats minimalistas */}
                <div className="flex justify-center lg:justify-start gap-12 mt-16 pt-8 border-t border-slate-100 text-slate-400">
                  <div>
                    <p className="text-3xl font-black text-slate-900">200+</p>
                    <p className="text-xs uppercase tracking-widest font-bold">
                      Modelos
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-slate-900">30K+</p>
                    <p className="text-xs uppercase tracking-widest font-bold">
                      Clientes
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Lado Derecho: Escenario Dinámico con la Mascota */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="relative h-[500px] lg:h-[650px] flex items-center justify-center"
              >
                {/* Elemento de diseño: Círculo de fondo minimalista */}
                <div className="absolute w-[70%] aspect-square bg-blue-50 rounded-full blur-3xl opacity-60" />
                <div className="absolute w-[80%] aspect-square border border-blue-100 rounded-full animate-[spin_30s_linear_infinite] opacity-40" />

                <div className="relative w-full h-full z-10 flex items-center justify-center">
                  <Image
                    src="/ASTA MASCOTA.png"
                    alt="Mascota ASTA"
                    width={600}
                    height={600}
                    priority
                    className="object-contain drop-shadow-[0_20px_50px_rgba(59,130,246,0.2)] hover:scale-105 transition-transform duration-500"
                    style={{ height: "auto", width: "auto" }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- EL RESTO DE TUS SECCIONES (No se tocan) --- */}
        {/* FEATURES SECTION - LIQUID GLASS 2.0 */}
        <section className="py-24 bg-[#f0f4f8] relative overflow-hidden">
          {/* Luces cinéticas de fondo */}
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
                  className="group relative p-12 rounded-[3.5rem] transition-all duration-700
                     bg-white/5 backdrop-blur-3xl
                     border-t border-l border-white/60 border-b border-r border-white/10
                     shadow-[25px_25px_50px_rgba(0,0,0,0.03),inset_0_0_20px_rgba(255,255,255,0.2)]
                     hover:shadow-[0_50px_100px_-20px_rgba(59,130,246,0.15),inset_0_0_30px_rgba(255,255,255,0.4)]
                     overflow-hidden"
                >
                  {/* Capa de Vidrio Líquido (Shimmer) */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  </div>

                  {/* Cáustica de fondo (Glow de color) */}
                  <div
                    className={`absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br ${feature.color} to-transparent blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                  />

                  {/* Header de la tarjeta */}
                  <div className="flex items-center gap-6 mb-8 relative z-10">
                    <div
                      className="w-16 h-16 bg-white/30 backdrop-blur-2xl rounded-2xl flex items-center justify-center text-3xl
                            shadow-[inset_0_0_15px_rgba(255,255,255,0.5)] border border-white/40
                            group-hover:rotate-[10deg] transition-transform duration-500"
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                      {feature.title}
                    </h3>
                  </div>

                  <p className="text-slate-600 leading-relaxed font-medium mb-8 relative z-10">
                    {feature.desc}
                  </p>

                  {/* Listado de contenido extra */}
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

                  {/* Detalle decorativo inferior */}
                  <div className="absolute bottom-6 right-10 text-xs font-black text-blue-600/20 uppercase tracking-widest group-hover:text-blue-600/40 transition-colors">
                    ASTA
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FEATURED PRODUCTS SECTION */}
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

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {FEATURED_PRODUCTS.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                    />
                    {/* <div className="absolute top-4 right-4 bg-[#0b63cd] text-white px-3 py-1 rounded-full text-sm font-bold">
                      {product.stock} stock
                    </div> */}
                  </div>

                  <div className="p-6">
                    <p className="text-sm text-[#44abff] font-semibold mb-2">
                      {product.category}
                    </p>
                    <h3 className="text-lg font-bold text-[#0b63cd] mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex justify-between items-center">
                      {/* <p className="text-2xl font-black text-[#44abff]">
                        ${product.price}
                      </p> */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-[#44abff] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#0b63cd] transition-colors"
                      >
                        Ver Detalles
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mt-12"
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
        {/* BRANDS SECTION - CAROUSEL ANIMADO INFINITO */}
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

        {/* HOW IT WORKS SECTION - DARK PREMIUM EDITION */}
        <section className="py-32 relative overflow-hidden bg-[#0a0f1a]">
          {/* Luces ambientales de fondo */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <h2 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.6em] mb-4">
                Ecosistema Logístico
              </h2>
              <h3 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tighter">
                Cómo <span className="text-blue-500">Funcionamos.</span>
              </h3>
              <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-8" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {/* Línea conectora animada (Solo visible en desktop) */}
              <div className="hidden lg:block absolute top-[45%] left-0 w-full h-[2px] bg-white/5 z-0">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400"
                />
              </div>

              {[
                {
                  step: "01",
                  title: "Selecciona",
                  description:
                    "Explora nuestro catálogo elite y elige la ingeniería de precisión que tu impresora merece.",
                  icon: <Search className="w-8 h-8" />, // Requiere importar Search de lucide-react
                  color: "from-blue-400 to-blue-600",
                },
                {
                  step: "02",
                  title: "Consulta",
                  description:
                    "Valida especificaciones y compatibilidad total con el apoyo de nuestros expertos técnicos.",
                  icon: <FileText className="w-8 h-8" />, // Requiere importar FileText de lucide-react
                  color: "from-blue-500 to-indigo-600",
                },
                {
                  step: "03",
                  title: "Ordena",
                  description:
                    "Gestión de pedido ágil con logística prioritaria para que tu flujo de trabajo nunca se detenga.",
                  icon: <ShoppingCart className="w-8 h-8" />, // Requiere importar ShoppingCart de lucide-react
                  color: "from-indigo-500 to-purple-600",
                },
                {
                  step: "04",
                  title: "Disfruta",
                  description:
                    "Recibe calidad certificada ASTA y experimenta la nitidez superior de la marca líder.",
                  icon: <ShieldCheck className="w-8 h-8" />, // Requiere importar ShieldCheck de lucide-react
                  color: "from-blue-600 to-cyan-500",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  className="group relative z-10"
                >
                  {/* Card con efecto Glassmorphism */}
                  <div className="h-full p-10 rounded-[3rem] bg-white/[0.03] border border-white/[0.08] backdrop-blur-2xl transition-all duration-500 hover:bg-white/[0.07] hover:border-blue-500/30 hover:-translate-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                    {/* Header de la Card: Icono + Número */}
                    <div className="flex justify-between items-center mb-10">
                      <div
                        className={`p-4 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}
                      >
                        {item.icon}
                      </div>
                      <span className="text-5xl font-black text-white/5 group-hover:text-blue-500/10 transition-colors duration-500 select-none">
                        {item.step}
                      </span>
                    </div>

                    <h4 className="text-2xl font-black text-white mb-4 tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-slate-400 leading-relaxed font-medium text-sm group-hover:text-slate-200 transition-colors">
                      {item.description}
                    </p>

                    {/* Detalle inferior interactivo */}
                    <div className="mt-8 flex items-center gap-2">
                      <div className="w-8 h-1 bg-blue-600 rounded-full group-hover:w-full transition-all duration-700" />
                      <div className="w-1 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
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
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-black text-[#0b63cd] mb-4">
                Preguntas Frecuentes
              </h2>
              <p className="text-xl text-gray-600">
                Respuestas a las dudas más comunes
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                {
                  q: "¿Qué garantía tienen los productos ASTA?",
                  a: "Todos nuestros productos incluyen garantía de satisfacción. Si no estás conforme con la calidad, ofrecemos cambio o reembolso.",
                },
                {
                  q: "¿Son los tóneres ASTA realmente compatibles?",
                  a: "Sí, cada producto está testado para garantizar 100% de compatibilidad con las impresoras de cada marca.",
                },
                {
                  q: "¿Cuál es el tiempo de entrega?",
                  a: "Entregamos en 24-48 horas en el área metropolitana. Para otras zonas, 3-5 días hábiles según disponibilidad.",
                },
                {
                  q: "¿Ofrecen descuentos por volumen?",
                  a: "Sí, contamos con programas especiales de precios para distribuidores y mayoristas. Contáctanos para más información.",
                },
                {
                  q: "¿Cómo puedo ser distribuidor autorizado de ASTA?",
                  a: "Tenemos un programa de asociación dedicado. Escríbenos a info@asta.com para conocer los requisitos.",
                },
                {
                  q: "¿Aceptan pagos internacionales?",
                  a: "Aceptamos transferencias bancarias, efectivo, cheques y métodos de pago electrónicos según tu ubicación.",
                },
              ].map((faq, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="border border-gray-200 rounded-lg p-6 hover:border-[#44abff] transition-colors"
                >
                  <h3 className="font-bold text-lg text-[#0b63cd] mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600">{faq.a}</p>
                </motion.div>
              ))}
            </motion.div>
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
                  La marca número 1 en consumibles para impresoras desde 1995.
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
                &copy; 2025 ASTA - Todos los derechos reservados | Política de
                Privacidad | Términos de Servicio
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
