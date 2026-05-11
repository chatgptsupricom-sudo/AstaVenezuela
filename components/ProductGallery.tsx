'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const CATEGORIES = [
  { name: 'Todos', id: 'all' },
  { name: 'Tóneres', id: 'toners' },
  { name: 'Tintas', id: 'inks' },
  { name: 'Cartuchos', id: 'cartridges' },
  { name: 'Accesorios', id: 'accessories' },
];

const GALLERY_PRODUCTS = [
  {
    id: 1,
    name: 'Tóner HP 105X',
    category: 'toners',
    image: '🖨️',
    compatibility: 'HP LaserJet',
    yield: 'Hasta 3000 páginas',
  },
  {
    id: 2,
    name: 'Tóner Canon CRG-055',
    category: 'toners',
    image: '🎯',
    compatibility: 'Canon ImageRunner',
    yield: 'Hasta 2300 páginas',
  },
  {
    id: 3,
    name: 'Tinta Canon GI-190',
    category: 'inks',
    image: '🖌️',
    compatibility: 'Canon PIXMA',
    yield: '100ML Cyan',
  },
  {
    id: 4,
    name: 'Tóner Brother TN-820',
    category: 'toners',
    image: '📄',
    compatibility: 'Brother HL-L9xxx',
    yield: 'Hasta 3000 páginas',
  },
];

export function ProductGallery() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts =
    activeCategory === 'all'
      ? GALLERY_PRODUCTS
      : GALLERY_PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {CATEGORIES.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              activeCategory === category.id
                ? 'bg-[#0b63cd] text-white shadow-lg'
                : 'bg-white text-[#0b63cd] border border-[#0b63cd] hover:bg-blue-50'
            }`}
          >
            {category.name}
          </motion.button>
        ))}
      </div>

      {/* Products Grid */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product, idx) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-white rounded-2xl overflow-hidden border border-blue-100 hover:border-blue-300 transition-all hover:shadow-xl"
          >
            {/* Image Background */}
            <div className="h-40 bg-gradient-to-br from-[#44abff] to-[#0b63cd] flex items-center justify-center overflow-hidden">
              <motion.span
                whileHover={{ scale: 1.2 }}
                className="text-6xl"
              >
                {product.image}
              </motion.span>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#0b63cd] transition">
                {product.name}
              </h3>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p className="flex items-start">
                  <span className="text-[#0b63cd] mr-2">✓</span>
                  {product.compatibility}
                </p>
                <p className="flex items-start">
                  <span className="text-[#0b63cd] mr-2">✓</span>
                  {product.yield}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-2 bg-[#0b63cd] text-white rounded-lg font-semibold hover:bg-[#0b2d4d] transition-colors text-sm"
              >
                Ver Detalles
              </motion.button>
            </div>

            {/* Hover Gradient */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-t from-[#0b63cd] to-transparent transition-opacity" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
