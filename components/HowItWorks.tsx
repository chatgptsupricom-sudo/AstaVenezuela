'use client';

import { motion } from 'framer-motion';

const STEPS = [
  {
    number: '01',
    title: 'Selecciona tu Producto',
    description: 'Elige entre tóneres, tintas o cartuchos compatibles con tu impresora.',
    icon: '🎯',
  },
  {
    number: '02',
    title: 'Garantía de Calidad',
    description: 'Todos nuestros productos cumplen estrictos estándares de calidad ASTA.',
    icon: '✓',
  },
  {
    number: '03',
    title: 'Rendimiento Máximo',
    description: 'Obtén resultados profesionales con máxima eficiencia de costo.',
    icon: '⚡',
  },
  {
    number: '04',
    title: 'Soporte Confiable',
    description: 'Acceso a asesoramiento experto cuando lo necesites.',
    icon: '🤝',
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-24 px-8 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-black text-[#0b63cd] mb-4">
            Cómo funciona
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Un proceso simple para obtener los mejores consumibles para tu impresora.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-[#44abff] via-[#0b63cd] to-[#44abff] opacity-30" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {STEPS.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Number Circle */}
                <div className="flex items-center justify-center mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#44abff] to-[#0b63cd] flex items-center justify-center text-white font-black text-2xl shadow-lg"
                  >
                    {step.number}
                    <div className="absolute inset-0 rounded-full border-2 border-white opacity-30" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <div className="text-4xl mb-3">{step.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow - only on desktop and not on last item */}
                {idx < STEPS.length - 1 && (
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="hidden md:block absolute -right-14 top-24 text-[#0b63cd] text-2xl"
                  >
                    →
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
