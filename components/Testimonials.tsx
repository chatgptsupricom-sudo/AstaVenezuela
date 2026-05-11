'use client';

import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    name: 'Carlos García',
    role: 'Gerente de Ventas',
    text: 'ASTA nos ha permitido ofrecer la mejor calidad a nuestros clientes sin comprometer los márgenes. Productos confiables.',
    avatar: '👨‍💼',
  },
  {
    name: 'María López',
    role: 'Dueña de Imprenta',
    text: 'Llevo 5 años usando ASTA y no cambio. La consistencia en calidad es incomparable. Mis clientes siempre notan la diferencia.',
    avatar: '👩‍💼',
  },
  {
    name: 'Juan Rodríguez',
    role: 'Distribuidor Autorizado',
    text: 'El soporte de ASTA es excepcional. Siempre tienen respuestas rápidas y soluciones efectivas. Una marca confiable 100%.',
    avatar: '👨‍🔧',
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-black text-[#0b63cd] mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Descubre por qué cientos de negocios confían en ASTA para sus necesidades de impresión.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-[#0b63cd] font-semibold">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
