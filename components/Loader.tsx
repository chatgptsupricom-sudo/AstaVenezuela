"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const PageLoader = () => {
  const pathname = usePathname();
  const isProductPage = pathname?.startsWith("/producto/");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    if (isProductPage) {
      // En páginas de producto esperar el evento de carga real, con fallback de 8s
      const done = () => setLoading(false);
      window.addEventListener("asta:content-ready", done, { once: true });
      const fallback = setTimeout(done, 8000);
      return () => {
        window.removeEventListener("asta:content-ready", done);
        clearTimeout(fallback);
      };
    } else {
      const timer = setTimeout(() => setLoading(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [pathname, isProductPage]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -20,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        >
          <div className="relative flex flex-col items-center">
            {/* Contenedor del Logo con Brillo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-48 h-20 mb-8"
            >
              <Image
                src="/ASTA LOGO.png"
                alt="Cargando ASTA"
                fill
                className="object-contain"
                priority
              />

              {/* Efecto de barrido de luz (Shine) */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "linear",
                  repeatDelay: 0.5,
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent w-1/2 skew-x-12"
              />
            </motion.div>

            {/* Barra de progreso minimalista (Estilo Inyección de Tinta) */}
            <div className="w-64 h-[2px] bg-slate-100 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-blue-400 via-blue-600 to-sky-400"
              />
            </div>

            {/* Texto sutil */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] ml-2"
            >
              Ingeniería en Impresión
            </motion.p>
          </div>

          {/* Círculos decorativos de fondo (Paleta de colores) */}
          <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-20 -right-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{ repeat: Infinity, duration: 5, delay: 1 }}
              className="absolute -bottom-20 -left-20 w-96 h-96 bg-sky-100 rounded-full blur-3xl"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
