"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const FAQS = [
  {
    question: "¿Son los productos ASTA compatibles con todas las impresoras?",
    answer:
      "ASTA es compatible con las marcas principales como HP, Canon, Brother, Epson, Samsung y Xerox. Consulta nuestro catálogo completo para verificar tu modelo específico.",
  },
  {
    question:
      "¿Qué diferencia hay entre tóneres originales y compatibles ASTA?",
    answer:
      "Nuestros tóneres cumplen estrictos estándares de calidad, ofreciendo resultados tan nítidos y vibrantes como los originales, pero con un costo mucho más accesible.",
  },
  {
    question: "¿Cuál es el tiempo de entrega?",
    answer:
      "Contamos con stock garantizado y entregas rápidas. El tiempo varía según tu ubicación, pero trabajamos para entregar en el menor tiempo posible.",
  },
  {
    question: "¿ASTA ofrece garantía en sus productos?",
    answer:
      "Sí, todos nuestros productos cuentan con garantía de calidad. Si hay algún problema, contamos con un equipo de soporte dedicado para asistirte.",
  },
  {
    question: "¿Cómo puedo convertirme en distribuidor ASTA?",
    answer:
      "Ofrecemos un programa de distribuidor con beneficios exclusivos, soporte dedicado y precios mayoristas. Contacta a nuestro equipo para conocer los requisitos.",
  },
  {
    question: "¿Dónde puedo comprar productos ASTA?",
    answer:
      "Puedes contactar directamente a nuestro equipo de ventas a través de nuestros canales de comunicación. Trabajamos con distribuidores autorizados en todo el país.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 px-8 bg-gradient-to-b from-blue-50/30 via-transparent to-transparent">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-black text-[#0b63cd] mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-gray-700 text-lg">
            Resolvemos las dudas más comunes sobre ASTA y nuestros productos.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
              className="border border-blue-100 rounded-2xl overflow-hidden bg-white hover:border-blue-300 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-8 py-6 flex items-center justify-between hover:bg-blue-50/50 transition-colors text-left"
              >
                <h3 className="font-bold text-gray-900 text-lg pr-4">
                  {faq.question}
                </h3>

                <motion.svg
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-6 text-[#0b63cd] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </motion.svg>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 pt-0 text-gray-700 border-t border-blue-100 bg-blue-50/30">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-700 mb-4">¿No encontraste tu respuesta?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-[#0b63cd] text-white rounded-full font-bold hover:bg-[#0b2d4d] transition-colors"
          >
            Contacta a Nuestro Equipo
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
