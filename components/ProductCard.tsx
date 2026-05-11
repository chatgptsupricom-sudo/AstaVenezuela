'use client';

import { motion } from 'framer-motion';

interface ProductCardProps {
  name: string;
  code: string;
  category: string;
  image: string;
  index: number;
}

export function ProductCard({ name, code, category, image, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(11, 99, 205, 0.3)' }}
      className="relative group bg-white rounded-2xl overflow-hidden border border-blue-100 hover:border-blue-300 transition-colors"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Image Container */}
      <div className="relative h-48 bg-gradient-to-br from-[#44abff] to-[#0b63cd] flex items-center justify-center overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="text-6xl"
        >
          {image}
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative p-6 z-10">
        <div className="text-xs font-semibold text-[#0b63cd] uppercase tracking-wider mb-2">
          {category}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-[#0b63cd] transition-colors">
          {name}
        </h3>
        <p className="text-sm text-gray-600 font-mono">{code}</p>

        {/* Hover Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="mt-4 flex items-center text-[#0b63cd] font-semibold text-sm"
        >
          Ver detalles
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

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#44abff] via-[#0b63cd] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}
