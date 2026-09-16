"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ControlPatches, ControlStrip } from "@/components/ControlStrip";
import { FeatureIcon } from "@/components/FeatureIcon";
import { Navbar } from "@/components/Navbar";
import {
  Award,
  BarChart3,
  BookOpen,
  Briefcase,
  Gauge,
  Handshake,
  Recycle,
  Wallet,
  Wrench,
} from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-surface min-h-screen pt-24">
        {/* Header */}
        {/* Base en --ink (#0a1a2f, la tinta oscura original), con un
            brillo radial hacia --brand-strong desde donde arranca el texto
            -- como el degradado anterior pero con el par de tonos correcto.
            Sin cálculo de tope esta vez: --ink y --brand-strong ya estaban
            verificados para texto blanco en 17,48:1 y 5,71:1 respectivamente
            (medidos antes en esta misma sesión), así que cualquier punto
            intermedio del radial cae dentro de ese rango. */}
        <section className="bg-[radial-gradient(140%_140%_at_12%_15%,var(--brand-strong)_0%,var(--ink)_100%)] py-14 text-white">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="mb-6 flex items-center gap-3">
              <ControlPatches />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-white">
                Distribuyendo desde 1995
              </span>
            </div>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-none tracking-tight [font-stretch:115%]">
              Sobre ASTA
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white">
              Tres décadas poniendo consumibles de impresión al alcance de
              oficinas, imprentas y distribuidores en Venezuela.
            </p>
          </div>
        </section>

        <ControlStrip alto="h-2" />

        {/* Story Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="mb-6 font-display text-4xl font-black uppercase tracking-tight text-ink [font-stretch:115%]">
                  Nuestra Historia
                </h2>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  ASTA nació en 1995 con una visión simple pero poderosa:
                  proporcionar consumibles de impresión de la más alta calidad a
                  precios competitivos. Lo que comenzó como un pequeño
                  distribuidor se ha convertido en la marca número 1 en
                  Venezuela.
                </p>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  Durante más de 25 años, hemos servido a miles de clientes,
                  desde pequeños negocios hasta grandes corporaciones. Nuestro
                  compromiso con la calidad y el servicio al cliente nos ha
                  permitido crecer y expandir nuestro catálogo de productos.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Hoy, ASTA continúa siendo sinónimo de confiabilidad, calidad y
                  rendimiento superior en consumibles para impresoras.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative h-96 flex items-center justify-center"
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ASTA%20MASCOTA-hveQftSuOf6A9CH7k6WgmcCgg9meGz.png"
                  alt="ASTA Panda"
                  width={300}
                  height={300}
                  className="object-contain drop-shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gradient-to-b from-surface to-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-black text-brand-strong mb-4">
                Nuestros Valores
              </h2>
              <p className="text-xl text-gray-600">
                Los principios que guían cada decisión
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Award,
                  title: "Calidad",
                  description:
                    "Cada producto ASTA es fabricado con estrictos controles de calidad y cumple estándares internacionales.",
                },
                {
                  icon: Handshake,
                  title: "Confiabilidad",
                  description:
                    "Somos tu socio confiable. Nuestro compromiso es cumplir siempre con lo prometido.",
                },
                {
                  icon: Gauge,
                  title: "Innovación",
                  description:
                    "Constantemente mejoramos nuestros productos para ofrecer soluciones de impresión de vanguardia.",
                },
                {
                  icon: Wallet,
                  title: "Valor",
                  description:
                    "Ofrecemos la mejor relación calidad-precio sin compromiso en la excelencia.",
                },
                {
                  icon: Recycle,
                  title: "Sostenibilidad",
                  description:
                    "Nos preocupamos por el medio ambiente y practicamos procedimientos eco-friendly.",
                },
                {
                  icon: BookOpen,
                  title: "Educación",
                  description:
                    "Capacitamos a nuestros clientes para maximizar el rendimiento de sus impresoras.",
                },
              ].map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-8 shadow-md border border-gray-100 text-center hover:shadow-lg transition-shadow"
                >
                  <FeatureIcon icon={value.icon} />
                  <h3 className="text-2xl font-bold text-brand-strong mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-brand to-brand-strong text-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "30+", label: "Años de Experiencia" },
                { number: "200+", label: "Productos Disponibles" },
                { number: "30K+", label: "Clientes Satisfechos" },
                { number: "8", label: "Marcas Soportadas" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <p className="text-5xl lg:text-6xl font-black mb-2">
                    {stat.number}
                  </p>
                  <p className="text-lg text-white/80">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-black text-brand-strong mb-4">
                Nuestro Equipo
              </h2>
              <p className="text-xl text-gray-600">
                Profesionales dedicados a tu éxito
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  role: "Gerente General",
                  description:
                    "Liderando ASTA hacia un futuro de innovación y crecimiento",
                  icon: Briefcase,
                },
                {
                  role: "Equipo de Ventas",
                  description:
                    "Dedicados a encontrar la solución perfecta para cada cliente",
                  icon: BarChart3,
                },
                {
                  role: "Soporte Técnico",
                  description:
                    "Disponibles 24/7 para resolver cualquier interrogante",
                  icon: Wrench,
                },
              ].map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-surface to-white rounded-lg p-8 border border-gray-100 text-center"
                >
                  <FeatureIcon icon={member.icon} />
                  <h3 className="text-2xl font-bold text-brand-strong mb-3">
                    {member.role}
                  </h3>
                  <p className="text-gray-600">{member.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-surface">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center bg-white rounded-lg p-12 shadow-md border border-gray-100"
            >
              <h2 className="mb-6 font-display text-4xl font-black uppercase tracking-tight text-ink [font-stretch:115%]">
                ¿Quieres Ser Parte de ASTA?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Contáctanos para conocer sobre nuestros programas de
                distribuidores
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-brand-strong text-white rounded-lg font-bold text-lg hover:bg-brand-navy transition-colors"
              >
                Solicitar Información
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
