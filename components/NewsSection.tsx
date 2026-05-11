'use client';

import { motion } from 'framer-motion';

const NEWS = [
  {
    id: 1,
    title: 'Nuevos Tóneres de Alto Rendimiento',
    excerpt: 'ASTA lanza su nueva línea de tóneres con rendimiento mejorado hasta 20% más páginas.',
    date: 'Abril 2024',
    image: '📄',
    category: 'Productos',
  },
  {
    id: 2,
    title: 'ASTA es #1 en Venezuela',
    excerpt: 'Según el último estudio de mercado, ASTA mantiene el liderazgo en consumibles para impresoras.',
    date: 'Marzo 2024',
    image: '🏆',
    category: 'Logros',
  },
  {
    id: 3,
    title: 'Programa de Distribuidor Premium',
    excerpt: 'Únete a nuestro programa de distribuidores y accede a beneficios exclusivos y soporte dedicado.',
    date: 'Febrero 2024',
    image: '🤝',
    category: 'Programa',
  },
];

export function NewsSection() {
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
            Últimas Noticias
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Mantente actualizado con las últimas novedades de ASTA.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl overflow-hidden border border-blue-100 hover:border-blue-300 transition-all hover:shadow-xl cursor-pointer"
              whileHover={{ translateY: -5 }}
            >
              {/* Image */}
              <div className="h-40 bg-gradient-to-br from-[#44abff] to-[#0b63cd] flex items-center justify-center text-6xl overflow-hidden">
                <motion.span whileHover={{ scale: 1.2 }} className="inline-block">
                  {article.image}
                </motion.span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#0b63cd] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500">{article.date}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#0b63cd] transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                <motion.div
                  className="flex items-center text-[#0b63cd] font-semibold text-sm"
                  whileHover={{ gap: '8px' }}
                >
                  Leer más
                  <motion.svg
                    animate={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
