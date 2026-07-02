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
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/productos")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setProduct(data.find((p: any) => p.code === code));
        window.dispatchEvent(new Event("asta:content-ready"));
      });
  }, [code]);

  const similarProducts = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 5);
  }, [allProducts, product]);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleWhatsAppClick = () => {
    if (!product) return;

    const phoneNumber = "584228008204";
    const message = `Hola, quiero más información sobre este producto:\n\n*Producto:* ${product.name}\n*Código:* ${product.code}\n\nLink del producto: ${currentUrl}`;
    const encodedMessage = encodeURIComponent(message);

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank",
    );
  };

  const handleShareClick = async () => {
    if (!product) return;

    const shareData = {
      title: product.name,
      text: `Mira este producto: ${product.name}`,
      url: currentUrl,
    };

    // Intenta usar la API nativa de compartir de celulares/navegadores modernos
    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare(shareData)
    ) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log("Error compartiendo:", error);
      }
    } else {
      // Fallback: Copiar enlace al portapapeles en desktop si no está disponible la API Share
      try {
        await navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("No se pudo copiar el enlace", err);
      }
    }
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
                  SKU: {product.code}
                </span>
              </div>

              <p className="text-gray-500 text-base md:text-lg mb-10 leading-relaxed border-l-4 border-gray-100 pl-6">
                {product.description}
              </p>

              {/* Contenedor de Botones de acción */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-fit">
                {/* 🟢 BOTÓN DE CONSULTAR */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsAppClick}
                  className="w-full sm:w-fit px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black rounded-2xl transition-colors flex items-center justify-center gap-3 shadow-lg shadow-green-100 tracking-wide text-sm md:text-base whitespace-nowrap"
                >
                  <Image
                    src="/whatsapp-wh.png"
                    alt="WhatsApp Logo"
                    width={22}
                    height={22}
                    className="object-contain"
                  />
                  CONSULTAR
                </motion.button>

                {/* 🔵 BOTÓN DE COMPARTIR */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleShareClick}
                  className="w-full sm:w-fit px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-2xl transition-colors flex items-center justify-center gap-3 tracking-wide text-sm md:text-base whitespace-nowrap"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                    />
                  </svg>
                  {copied ? "¡ENLACE COPIADO!" : "COMPARTIR"}
                </motion.button>
              </div>
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
