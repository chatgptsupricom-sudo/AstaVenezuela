"use client";

import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [allProducts, setAllProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/productos")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setProduct(data.find((p: any) => p.id === id));
      });
  }, [id]);

  const similarProducts = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 5);
  }, [allProducts, product]);

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center font-black text-2xl text-gray-300">
        CARGANDO...
      </div>
    );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24 pb-20 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Breadcrumb / Back button */}
          <button
            onClick={() => router.back()}
            className="text-sm font-bold text-gray-400 hover:text-black mb-8 transition-colors"
          >
            ← VOLVER AL CATÁLOGO
          </button>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            {/* Left: Imagen (Fondo eliminado) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square md:aspect-[4/3] w-full flex items-center justify-center"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>

            {/* Right: Info */}
            <div className="flex flex-col justify-center">
              <span className="text-[#0b63cd] font-bold text-xs uppercase tracking-[0.2em] mb-4">
                {product.category}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black leading-[1.1] md:leading-[1.2] max-w-sm md:max-w-full break-words mb-6">
                {product.name}
              </h1>

              <div className="flex items-center gap-6 mb-8">
                <span className="px-4 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full">
                  EN STOCK
                </span>
              </div>

              <p className="text-gray-500 text-base md:text-lg mb-10 leading-relaxed border-l-4 border-gray-100 pl-6">
                {product.description}
              </p>
            </div>
          </div>

          {/* Similares - Responsivo */}
          {similarProducts.length > 0 && (
            <section className="mt-20 md:mt-32">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-10 uppercase tracking-widest">
                También te podría interesar
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                {similarProducts.map((p) => (
                  <motion.div
                    key={p.id}
                    whileHover={{ y: -5 }}
                    className="group cursor-pointer border border-gray-100 rounded-2xl p-4 transition-all hover:shadow-lg"
                    onClick={() => router.push(`/producto/${p.id}`)}
                  >
                    <div className="relative aspect-square mb-4">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 50vw, 20vw"
                      />
                    </div>
                    <h4 className="font-bold text-sm text-gray-800 line-clamp-2 leading-tight">
                      {p.name}
                    </h4>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
