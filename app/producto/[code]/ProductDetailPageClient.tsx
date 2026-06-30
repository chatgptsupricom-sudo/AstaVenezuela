"use client";

import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function ProductDetailPageClient() {
  const { code } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [allProducts, setAllProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/productos")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setProduct(data.find((p: any) => p.code === code));
      });
  }, [code]);

  const similarProducts = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 5);
  }, [allProducts, product]);

  const handleWhatsAppClick = () => {
    if (!product) return;

    const phoneNumber = "584228008204";
    const currentUrl =
      typeof window !== "undefined" ? window.location.href : "";

    const message = `Hola, quiero más información sobre este producto:\n\n*Producto:* ${product.name}\n*Código:* ${product.code}\n\nLink del producto: ${currentUrl}`;
    const encodedMessage = encodeURIComponent(message);

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank",
    );
  };

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
          <button
            onClick={() => router.back()}
            className="text-sm font-bold text-gray-400 hover:text-black mb-8 transition-colors"
          >
            ← VOLVER AL CATÁLOGO
          </button>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
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

            <div className="flex flex-col justify-center">
              <span className="text-[#0b63cd] font-bold text-xs uppercase tracking-[0.2em] mb-4">
                {product.category}
              </span>
              <h1 className="lg:text-5xl font-black text-black md:max-w-full break-words mb-6">
                {product.name}
              </h1>

              <div className="flex items-center gap-6 mb-8">
                <span className="px-4 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full">
                  EN STOCK
                </span>
                <span className="text-gray-400 font-mono text-sm">
                  Código: {product.code}
                </span>
              </div>

              <p className="text-gray-500 text-base md:text-lg mb-10 leading-relaxed border-l-4 border-gray-100 pl-6">
                {product.description}
              </p>

              {/* 🟢 BOTÓN DE CONSULTAR CON ICONO OFICIAL DE WHATSAPP */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsAppClick}
                className="w-full md:w-fit px-8 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xl rounded-2xl transition-colors flex items-center justify-center gap-3 shadow-lg shadow-green-100 tracking-wide"
              >
                {/* Icono oficial exacto extraído de la marca de WhatsApp */}
                <svg
                  className="w-7 h-7 fill-white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.764.46 3.42 1.268 4.876L2 22l5.304-1.392A9.96 9.96 0 0 0 12.004 22c5.52 0 10-4.48 10-10c0-5.52-4.48-10-10-10zm0 1.716c4.572 0 8.288 3.716 8.288 8.288c0 4.572-3.716 8.284-8.288 8.284c-1.688 0-3.256-.508-4.572-1.376l-.328-.196l-3.148.824l.84-3.064l-.216-.344a8.232 8.232 0 0 1-1.164-4.128c0-4.572 3.716-8.288 8.288-8.288zm-3.46 4.312a.668.668 0 0 0-.484.228c-.168.196-.644.628-.644 1.532c0 .904.66 1.78.752 1.904c.092.124 1.272 2.052 3.12 2.784c1.54.608 1.852.488 2.192.456c.34-.032 1.096-.448 1.252-.88c.156-.432.156-.804.108-.884c-.048-.08-.196-.124-.412-.232c-.216-.108-1.284-.632-1.484-.704c-.196-.072-.34-.108-.484.108c-.144.216-.556.704-.68 1.152c-.124.448-.248.492-.464.384c-.216-.108-.912-.336-1.74-1.072c-.644-.576-1.08-1.288-1.208-1.504c-.124-.216-.012-.332.096-.44c.096-.096.216-.252.324-.376c.108-.124.144-.216.216-.36c.072-.144.036-.272-.016-.38c-.056-.108-.484-1.168-.664-1.604c-.176-.424-.352-.364-.484-.372z" />
                </svg>
                CONSULTAR
              </motion.button>
            </div>
          </div>

          {/* Similares */}
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
                    onClick={() => router.push(`/producto/${p.code}`)}
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
