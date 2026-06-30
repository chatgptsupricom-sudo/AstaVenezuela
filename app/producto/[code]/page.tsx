// "use client";

// import { Navbar } from "@/components/Navbar";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useMemo, useState } from "react";

// export default function ProductDetailPage() {
//   const { code } = useParams();
//   const router = useRouter();
//   const [product, setProduct] = useState<any>(null);
//   const [allProducts, setAllProducts] = useState<any[]>([]);

//   useEffect(() => {
//     fetch("/api/productos")
//       .then((res) => res.json())
//       .then((data) => {
//         setAllProducts(data);
//         // CAMBIO AQUÍ: buscas por sku/referencia en lugar de id
//         setProduct(data.find((p: any) => p.code === code));
//       });
//   }, [code]); // El efecto se dispara cuando cambia el sku

//   const similarProducts = useMemo(() => {
//     if (!product) return [];
//     return allProducts
//       .filter((p) => p.category === product.category && p.id !== product.id)
//       .slice(0, 5);
//   }, [allProducts, product]);

//   if (!product)
//     return (
//       <div className="min-h-screen flex items-center justify-center font-black text-2xl text-gray-300">
//         CARGANDO...
//       </div>
//     );

//   return (
//     <>
//       <Navbar />
//       <main className="min-h-screen bg-white pt-24 pb-20 px-4 md:px-6">
//         <div className="container mx-auto max-w-7xl">
//           {/* Breadcrumb / Back button */}
//           <button
//             onClick={() => router.back()}
//             className="text-sm font-bold text-gray-400 hover:text-black mb-8 transition-colors"
//           >
//             ← VOLVER AL CATÁLOGO
//           </button>

//           <div className="grid md:grid-cols-2 gap-8 md:gap-16">
//             {/* Left: Imagen (Fondo eliminado) */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="relative aspect-square md:aspect-[4/3] w-full flex items-center justify-center"
//             >
//               <Image
//                 src={product.image}
//                 alt={product.name}
//                 fill
//                 className="object-contain"
//                 sizes="(max-width: 768px) 100vw, 50vw"
//                 priority
//               />
//             </motion.div>

//             {/* Right: Info */}
//             <div className="flex flex-col justify-center">
//               <span className="text-[#0b63cd] font-bold text-xs uppercase tracking-[0.2em] mb-4">
//                 {product.category}
//               </span>
//               <h1 className=" lg:text-5xl font-black text-black   md:max-w-full break-words mb-6">
//                 {product.name}
//               </h1>

//               <div className="flex items-center gap-6 mb-8">
//                 <span className="px-4 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full">
//                   EN STOCK
//                 </span>
//               </div>

//               <p className="text-gray-500 text-base md:text-lg mb-10 leading-relaxed border-l-4 border-gray-100 pl-6">
//                 {product.description}
//               </p>
//             </div>
//           </div>

//           {/* Similares - Responsivo */}
//           {similarProducts.length > 0 && (
//             <section className="mt-20 md:mt-32">
//               <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-10 uppercase tracking-widest">
//                 También te podría interesar
//               </h3>
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
//                 {similarProducts.map((p) => (
//                   <motion.div
//                     key={p.id}
//                     whileHover={{ y: -5 }}
//                     className="group cursor-pointer border border-gray-100 rounded-2xl p-4 transition-all hover:shadow-lg"
//                     onClick={() => router.push(`/producto/${p.code}`)}
//                   >
//                     <div className="relative aspect-square mb-4">
//                       <Image
//                         src={p.image}
//                         alt={p.name}
//                         fill
//                         className="object-contain"
//                         sizes="(max-width: 768px) 50vw, 20vw"
//                       />
//                     </div>
//                     <h4 className="font-bold text-sm text-gray-800 line-clamp-2 leading-tight">
//                       {p.name}
//                     </h4>
//                   </motion.div>
//                 ))}
//               </div>
//             </section>
//           )}
//         </div>
//       </main>
//     </>
//   );
// }
"use client";

import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function ProductDetailPage() {
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

  // 🟢 FUNCIÓN PARA GENERAR EL LINK DE WHATSAPP
  const handleWhatsAppClick = () => {
    if (!product) return;

    const phoneNumber = "584122928717"; // Código de país + número sin el cero inicial

    // Construimos la URL actual para que WhatsApp genere la previsualización/metadata con la foto
    const currentUrl =
      typeof window !== "undefined" ? window.location.href : "";

    // Mensaje personalizado bien formateado
    const message = `Hola, quiero más información sobre este producto:\n\n*Producto:* ${product.name}\n*Código:* ${product.code}\n\nLink del producto: ${currentUrl}`;

    // Codificamos el texto para que sea válido en una URL
    const encodedMessage = encodeURIComponent(message);

    // Abrimos el enlace en una pestaña nueva
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
          {/* Breadcrumb / Back button */}
          <button
            onClick={() => router.back()}
            className="text-sm font-bold text-gray-400 hover:text-black mb-8 transition-colors"
          >
            ← VOLVER AL CATÁLOGO
          </button>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            {/* Left: Imagen */}
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

              {/* 🟢 BOTÓN DE CONSULTAR POR WHATSAPP */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsAppClick}
                className="w-full md:w-fit px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-black text-lg rounded-xl transition-colors flex items-center justify-center gap-3 shadow-lg shadow-green-100"
              >
                {/* Icono de WhatsApp simple usando SVG */}
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.267 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm6.59-4.846c1.66.986 3.515 1.505 5.409 1.506 5.494 0 9.961-4.464 9.964-9.961a9.894 9.894 0 0 0-2.884-7.013A9.9 9.9 0 0 0 12.008 1.41c-5.503 0-9.971 4.467-9.974 9.969a9.932 9.932 0 0 0 1.462 5.163l-.995 3.634 3.72-.977zm12.306-7.14c-.33-.165-1.954-.964-2.253-1.074-.3-.109-.518-.165-.735.165-.218.33-.845 1.074-1.036 1.292-.19.218-.382.245-.712.08-1.53-.767-2.555-1.282-3.565-3.024-.265-.457.266-.425.76-1.414.082-.165.041-.31-.02-.442-.062-.132-.518-1.247-.71-1.707-.187-.45-.377-.39-.518-.397-.133-.006-.287-.007-.44-.007a.846.846 0 0 0-.612.287c-.21.23-1.01 1.01-1.01 2.463 0 1.453 1.054 2.853 1.202 3.05.147.197 2.074 3.167 5.023 4.444.702.304 1.25.485 1.678.62.705.224 1.347.193 1.854.117.565-.085 1.954-.8 2.23-1.57.275-.77.275-1.43.193-1.57-.083-.14-.298-.223-.628-.39z" />
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
