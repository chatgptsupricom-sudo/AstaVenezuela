'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import dynamic from 'next/dynamic';
import { FEATURED_PRODUCTS, BRANDS } from '@/lib/products';

const MascotScene = dynamic(() => import('@/components/MascotScene').then(mod => ({ default: mod.MascotScene })), {
  ssr: false,
});

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
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('Tóneres HP');

  return (
    <>
      <Navbar />
      <main className="bg-[#f3f5f4] overflow-hidden">
        {/* HERO SECTION */}
        <section className="relative min-h-screen bg-gradient-to-br from-[#44abff] via-[#4db8ff] to-[#0b63cd] overflow-hidden flex items-center justify-center pt-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-6 relative z-10 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <motion.img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ASTA%20LOGO-vtQAMg0Q2u2aytIUDPgrmSZqP65VBq.png"
                  alt="ASTA Logo"
                  className="h-24 w-auto mb-8"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />

                <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-6">
                  Consumibles{' '}
                  <span className="block text-yellow-300">Premium para</span>
                  Impresoras
                </h1>

                <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-lg leading-relaxed">
                  Desde 1995, ASTA es la marca número 1 en calidad y confiabilidad de consumibles para impresoras en Venezuela. Tóneres, tintas y cartuchos con garantía de rendimiento superior.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a
                    href="/catalog"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-[#0b63cd] rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors w-full sm:w-auto text-center"
                  >
                    Ver Catálogo Completo
                  </motion.a>
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05, borderColor: 'white' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white/10 transition-colors w-full sm:w-auto text-center"
                  >
                    Contáctanos
                  </motion.a>
                </div>

                <div className="flex gap-8 mt-12 text-white">
                  <div>
                    <p className="text-3xl font-bold">200+</p>
                    <p className="text-sm">Productos Disponibles</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">8</p>
                    <p className="text-sm">Marcas Soportadas</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">30K+</p>
                    <p className="text-sm">Clientes Satisfechos</p>
                  </div>
                </div>
              </motion.div>

              {/* Right: Image Carousel */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="relative h-96 lg:h-full flex items-center justify-center"
              >
                <div className="relative w-full h-96">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/68-WIfsmGWGp41qhO0VUBG5RCWuYl57Xd.jpg"
                    alt="ASTA Products"
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-black text-[#0b63cd] mb-4">
                ¿Por Qué Elegir ASTA?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Somos especialistas en soluciones de impresión con los más altos estándares de calidad
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
                  title: 'Calidad Premium',
                  description: 'Nuestros productos están fabricados bajo estrictos estándares internacionales para garantizar la mejor calidad.',
                  icon: '⭐',
                },
                {
                  title: 'Máximo Rendimiento',
                  description: 'Tóneres e tintas que ofrecen más páginas impresas y colores más vibrantes que la competencia.',
                  icon: '🚀',
                },
                {
                  title: 'Garantía Completa',
                  description: 'Cada producto ASTA incluye garantía de satisfacción y soporte técnico dedicado.',
                  icon: '✅',
                },
                {
                  title: 'Stock Garantizado',
                  description: 'Más de 200 SKUs disponibles en inventario para entregas rápidas y confiables.',
                  icon: '📦',
                },
                {
                  title: 'Precios Competitivos',
                  description: 'La mejor relación calidad-precio del mercado con opciones para todos los presupuestos.',
                  icon: '💰',
                },
                {
                  title: 'Compatible Universal',
                  description: 'Productos compatibles con HP, Canon, Brother, Samsung, Epson y más marcas líderes.',
                  icon: '🔧',
                },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-8 bg-gradient-to-br from-[#f3f5f4] to-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <p className="text-5xl mb-4">{feature.icon}</p>
                  <h3 className="text-xl font-bold text-[#0b63cd] mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
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
                    <div className="absolute top-4 right-4 bg-[#0b63cd] text-white px-3 py-1 rounded-full text-sm font-bold">
                      {product.stock} stock
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-sm text-[#44abff] font-semibold mb-2">{product.category}</p>
                    <h3 className="text-lg font-bold text-[#0b63cd] mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                    <div className="flex justify-between items-center">
                      <p className="text-2xl font-black text-[#44abff]">${product.price}</p>
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
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-black text-[#0b63cd] mb-4">
                Marcas Compatibles
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Productos compatibles con las marcas líderes de impresoras
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6"
            >
              {BRANDS.map((brand, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                  className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#f3f5f4] to-white border border-gray-200 rounded-lg hover:border-[#44abff] hover:shadow-md transition-all"
                >
                  <p className="text-4xl mb-2">{brand.logo}</p>
                  <p className="font-bold text-[#0b63cd] text-center">{brand.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{brand.products} productos</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="py-20 bg-gradient-to-br from-[#44abff] to-[#0b63cd]">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
                Cómo Funcionamos
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Un proceso simple para conseguir los mejores consumibles
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
            >
              {[
                { step: '1', title: 'Selecciona', description: 'Elige el producto que necesitas de nuestro amplio catálogo' },
                { step: '2', title: 'Consulta', description: 'Revisa especificaciones, compatibilidad y precios' },
                { step: '3', title: 'Ordena', description: 'Realiza tu pedido con entrega rápida y segura' },
                { step: '4', title: 'Disfruta', description: 'Recibe y usa tus productos con garantía ASTA' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="relative"
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
                    <div className="text-5xl font-black text-yellow-300 mb-4">{item.step}</div>
                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-white/80">{item.description}</p>
                  </div>
                  {idx < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-white text-2xl">
                      →
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
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
                  name: 'Carlos Rodríguez',
                  company: 'Copias Rápidas SRL',
                  comment: 'Los tóneres ASTA tienen la mejor relación calidad-precio. Nuestros clientes notaron inmediatamente la mejora en las impresiones.',
                  rating: 5,
                },
                {
                  name: 'María López',
                  company: 'Imprenta Digital Plus',
                  comment: 'Excelente servicio y productos de calidad. El equipo de ASTA siempre está disponible para ayudarnos.',
                  rating: 5,
                },
                {
                  name: 'Juan Pérez',
                  company: 'Centro de Impresión Moderno',
                  comment: 'Llevar ASTA como distribuidor ha sido la mejor decisión para mi negocio. Stock garantizado y precios competitivos.',
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
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.comment}"</p>
                  <div>
                    <p className="font-bold text-[#0b63cd]">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.company}</p>
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
                  q: '¿Qué garantía tienen los productos ASTA?',
                  a: 'Todos nuestros productos incluyen garantía de satisfacción. Si no estás conforme con la calidad, ofrecemos cambio o reembolso.',
                },
                {
                  q: '¿Son los tóneres ASTA realmente compatibles?',
                  a: 'Sí, cada producto está testado para garantizar 100% de compatibilidad con las impresoras de cada marca.',
                },
                {
                  q: '¿Cuál es el tiempo de entrega?',
                  a: 'Entregamos en 24-48 horas en el área metropolitana. Para otras zonas, 3-5 días hábiles según disponibilidad.',
                },
                {
                  q: '¿Ofrecen descuentos por volumen?',
                  a: 'Sí, contamos con programas especiales de precios para distribuidores y mayoristas. Contáctanos para más información.',
                },
                {
                  q: '¿Cómo puedo ser distribuidor autorizado de ASTA?',
                  a: 'Tenemos un programa de asociación dedicado. Escríbenos a info@asta.com para conocer los requisitos.',
                },
                {
                  q: '¿Aceptan pagos internacionales?',
                  a: 'Aceptamos transferencias bancarias, efectivo, cheques y métodos de pago electrónicos según tu ubicación.',
                },
              ].map((faq, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="border border-gray-200 rounded-lg p-6 hover:border-[#44abff] transition-colors"
                >
                  <h3 className="font-bold text-lg text-[#0b63cd] mb-2">{faq.q}</h3>
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
                  Desde el 95, el panda ASTA ha sido símbolo de amabilidad, confiabilidad y calidad en la familia de consumibles. ¡Es nuestro embajador favorito!
                </p>
                <div className="space-y-4">
                  {[
                    '🎯 Experto en soluciones de impresión',
                    '💡 Siempre trae las mejores ideas',
                    '🤝 Tu socio de confianza',
                    '🌟 Garantía ASTA en cada producto',
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 text-white"
                    >
                      <span className="text-2xl">{item.split(' ')[0]}</span>
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
                Únete a miles de clientes que ya confían en ASTA para sus necesidades de impresión
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
                  📧 info@asta.com | 📞 +58 (0) 212 XXX-XXXX | 🌐 www.asta.com.ve
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
                  <li><a href="#" className="hover:text-white">Tóneres</a></li>
                  <li><a href="#" className="hover:text-white">Tintas</a></li>
                  <li><a href="#" className="hover:text-white">Accesorios</a></li>
                  <li><a href="#" className="hover:text-white">Ofertas</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Empresa</h4>
                <ul className="space-y-2 text-white/80">
                  <li><a href="#" className="hover:text-white">Sobre Nosotros</a></li>
                  <li><a href="#" className="hover:text-white">Distribuidor</a></li>
                  <li><a href="#" className="hover:text-white">Contacto</a></li>
                  <li><a href="#" className="hover:text-white">Blog</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Síguenos</h4>
                <ul className="space-y-2 text-white/80">
                  <li><a href="#" className="hover:text-white">Facebook</a></li>
                  <li><a href="#" className="hover:text-white">Instagram</a></li>
                  <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                  <li><a href="#" className="hover:text-white">YouTube</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/20 pt-8 text-center text-white/80">
              <p>&copy; 2025 ASTA - Todos los derechos reservados | Política de Privacidad | Términos de Servicio</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
