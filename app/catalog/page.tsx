'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { FEATURED_PRODUCTS } from '@/lib/products';

const ALL_PRODUCTS = [
  ...FEATURED_PRODUCTS,
  ...FEATURED_PRODUCTS.map((p, i) => ({ ...p, id: `${p.id}-${i}` })),
];

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const categories = ['Todas', 'Tóneres HP', 'Tóneres Canon', 'Tóneres Brother', 'Tintas'];

  const filteredProducts = useMemo(() => {
    let filtered = ALL_PRODUCTS;

    if (selectedCategory !== 'Todas') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'stock') return b.stock - a.stock;
      return 0;
    });
  }, [selectedCategory, searchTerm, sortBy]);

  return (
    <>
      <Navbar />
      <main className="bg-[#f3f5f4] min-h-screen pt-24">
        {/* Header */}
        <section className="bg-gradient-to-r from-[#44abff] to-[#0b63cd] text-white py-12">
          <div className="container mx-auto px-6 max-w-7xl">
            <h1 className="text-4xl lg:text-5xl font-black mb-4">Catálogo Completo</h1>
            <p className="text-lg text-white/90">
              Explora nuestros {filteredProducts.length} productos disponibles
            </p>
          </div>
        </section>

        <div className="container mx-auto px-6 max-w-7xl py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg p-6 sticky top-28"
              >
                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-[#0b63cd] mb-2">Buscar</label>
                  <input
                    type="text"
                    placeholder="Producto o código..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#44abff] focus:border-transparent"
                  />
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-bold text-[#0b63cd] mb-4">Categorías</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <motion.button
                        key={cat}
                        whileHover={{ x: 5 }}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          selectedCategory === cat
                            ? 'bg-[#44abff] text-white font-bold'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {cat}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-bold text-[#0b63cd] mb-2">Ordenar por</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#44abff] focus:border-transparent"
                  >
                    <option value="name">Nombre</option>
                    <option value="price">Precio</option>
                    <option value="stock">Stock</option>
                  </select>
                </div>
              </motion.div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {filteredProducts.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredProducts.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100"
                    >
                      <div className="relative h-48 bg-gray-100 overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover hover:scale-110 transition-transform"
                        />
                        <div className="absolute top-4 right-4 bg-[#0b63cd] text-white px-3 py-1 rounded-full text-sm font-bold">
                          ${product.price}
                        </div>
                      </div>

                      <div className="p-6">
                        <p className="text-xs text-[#44abff] font-semibold mb-2 uppercase">
                          {product.category}
                        </p>
                        <h3 className="font-bold text-[#0b63cd] mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">{product.id}</p>

                        <div className="flex justify-between items-center mb-4">
                          <span className="text-sm font-semibold text-gray-700">
                            Stock: <span className="text-[#44abff]">{product.stock}</span>
                          </span>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full px-4 py-2 bg-[#44abff] text-white rounded-lg font-bold hover:bg-[#0b63cd] transition-colors"
                        >
                          Ver Detalles
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-xl text-gray-600">
                    No hay productos que coincidan con tu búsqueda
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
