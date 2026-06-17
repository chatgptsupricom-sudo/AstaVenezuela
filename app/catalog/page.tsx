"use client";

import { Navbar } from "@/components/Navbar";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link"; // Asegúrate de importar esto
import { useEffect, useMemo, useState } from "react";

// Definimos el tipo de producto
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  code: string;
  description: string; // 🔴 Nueva propiedad
}

export default function CatalogPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  // NUEVO ESTADO: Controla el modal de detalles
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fetch a nuestra API creada
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/productos");
        if (!res.ok) throw new Error("Error al obtener los datos");

        const data = await res.json();
        setAllProducts(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Generamos categorías dinámicas
  const categories = useMemo(() => {
    const unique = Array.from(new Set(allProducts.map((p) => p.category)));
    return ["Todas", ...unique.sort()];
  }, [allProducts]);

  // Aplicamos filtros y búsqueda
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    if (selectedCategory !== "Todas") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.code.toLowerCase().includes(lower),
      );
    }

    return filtered.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "stock") return b.stock - a.stock;
      return 0;
    });
  }, [allProducts, selectedCategory, searchTerm, sortBy]);

  // Bloquea el scroll del body cuando el modal está abierto
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedProduct]);

  return (
    <>
      <Navbar />
      <main className="bg-[#f3f5f4] min-h-screen pt-24 relative">
        {/* Header */}
        <section className="bg-gradient-to-r from-[#44abff] to-[#0b63cd] text-white py-12">
          <div className="container mx-auto px-6 max-w-7xl">
            <h1 className="text-4xl lg:text-5xl font-black mb-4">
              Catálogo Completo
            </h1>
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
                <div className="mb-6">
                  <label className="block text-sm font-bold text-[#0b63cd] mb-2">
                    Buscar
                  </label>
                  <input
                    type="text"
                    placeholder="Producto o código..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#44abff] outline-none"
                  />
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-[#0b63cd] mb-4">Categorías</h3>
                  <div className="space-y-2">
                    {categories.map((cat, idx) => (
                      <motion.button
                        key={`category-${cat}-${idx}`}
                        whileHover={{ x: 5 }}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          selectedCategory === cat
                            ? "bg-[#44abff] text-white font-bold"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {cat}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#0b63cd] mb-2">
                    Ordenar por
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#44abff] outline-none"
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
              {isLoading ? (
                <div className="text-center py-20">
                  <p className="text-xl text-[#0b63cd] font-bold animate-pulse">
                    Cargando catálogo...
                  </p>
                </div>
              ) : error ? (
                <div className="text-center py-20 text-red-500 font-bold">
                  {error}
                </div>
              ) : filteredProducts.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredProducts.map((product, idx) => (
                    <motion.div
                      key={`product-${product.id || "no-id"}-${idx}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 flex flex-col"
                    >
                      <div className="relative h-48 bg-white p-4 flex items-center justify-center overflow-hidden border-b border-gray-100">
                        <Image
                          src={product.image || "/placeholder.jpg"}
                          alt={product.name || "Producto ASTA"}
                          width={150}
                          height={150}
                          className="object-contain hover:scale-110 transition-transform"
                        />
                        <div className="absolute top-2 right-2 bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-mono">
                          {product.code}
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        <p className="text-xs text-[#44abff] font-semibold mb-2 uppercase line-clamp-1">
                          {product.category}
                        </p>
                        <h3 className="font-bold text-[#0b63cd] mb-4 line-clamp-2 flex-1">
                          {product.name}
                        </h3>
                        {/* Formateo de precio profesional */}
                        {/* <p className="font-bold text-xl mb-4 text-gray-800">
                          $
                          {product.price.toLocaleString("es-VE", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p> */}

                        <Link
                          href={`/producto/${product.id}`}
                          className="w-full text-center px-4 py-2 bg-[#44abff] text-white rounded-lg font-bold hover:bg-[#0b63cd] transition-colors mt-auto block"
                        >
                          Ver Detalles
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600">
                    No hay productos que coincidan con tu búsqueda
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* MODAL DE DETALLES DEL PRODUCTO */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Fondo oscuro con blur (clic para cerrar) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Contenedor del Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 max-h-[90vh]"
            >
              {/* Botón de cerrar (X) */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors"
              >
                ✕
              </button>

              {/* Lado izquierdo: Imagen */}
              <div className="w-full md:w-1/2 bg-gray-50 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 min-h-[300px]">
                <div className="relative w-full h-full max-w-[300px] aspect-square">
                  <Image
                    src={selectedProduct.image || "/placeholder.jpg"}
                    alt={selectedProduct.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Lado derecho: Información */}
              <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
                <span className="inline-block px-3 py-1 bg-[#e6f4ff] text-[#0b63cd] text-xs font-bold rounded-full w-fit mb-4">
                  {selectedProduct.category}
                </span>

                <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-2">
                  {selectedProduct.name}
                </h2>

                <p className="text-gray-500 font-mono text-sm mb-6 pb-6 border-b border-gray-100">
                  SKU: {selectedProduct.code}
                </p>

                {/* 🔴 NUEVA SECCIÓN DE DESCRIPCIÓN */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-800 mb-2">
                    Descripción
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* <div className="mb-8">
                  <p className="text-sm text-gray-500 mb-1">Precio</p>
                  <p className="text-4xl font-black text-[#0b63cd]">
                    $
                    {selectedProduct.price.toLocaleString("es-VE", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div> */}

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                    <span className="text-gray-600 font-semibold">
                      Disponibilidad
                    </span>
                    <span
                      className={`font-bold ${selectedProduct.stock > 0 ? "text-green-600" : "text-red-500"}`}
                    >
                      {selectedProduct.stock > 0
                        ? `${selectedProduct.stock} unidades en stock`
                        : "Agotado"}
                    </span>
                  </div>
                </div>

                {/* Botón de acción */}
                <button
                  className="w-full py-4 mt-auto bg-[#44abff] hover:bg-[#0b63cd] text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-200"
                  onClick={() => {
                    // Aquí puedes agregar la lógica para añadir al carrito a futuro
                    alert(
                      "Función para añadir al carrito o contactar a ventas pronto",
                    );
                  }}
                >
                  Contactar Asesor
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
