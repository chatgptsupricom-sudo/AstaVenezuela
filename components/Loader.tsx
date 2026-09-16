"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

// Bloqueaba la pantalla 2,5 s en cada primera carga sin ninguna razón real:
// next/font ya precarga Archivo/Geist sin parpadeo, así que no había nada
// que esta espera estuviera realmente cubriendo — era puro teatro. Se queda
// en un flash breve de marca en vez de un obstáculo, y se salta por completo
// si el sistema pide reducir el movimiento.
const DURACION_MS = 900;
const DESVANECIDO_MS = 400;

// A propósito, esto NO usa <AnimatePresence>. Se probó y confirmó: si el
// motor de animación de framer-motion se traba por lo que sea (una pestaña
// en segundo plano, un equipo lento, este mismo panel de pruebas), la salida
// nunca "termina", AnimatePresence nunca desmonta, y el overlay se queda
// para siempre bloqueando toda la pantalla — incluidos los clics, porque
// sigue en el DOM a pantalla completa. El desmontado real va por un
// temporizador propio que no depende de que ninguna animación resuelva.
// El fundido es una mejora visual sobre esa base, no el mecanismo en sí.
export const PageLoader = () => {
  const [loading, setLoading] = useState(true);
  const [saliendo, setSaliendo] = useState(false);

  useEffect(() => {
    const prefiereMenosMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefiereMenosMovimiento) {
      setLoading(false);
      return;
    }

    const salir = setTimeout(() => setSaliendo(true), DURACION_MS);
    const desmontar = setTimeout(
      () => setLoading(false),
      DURACION_MS + DESVANECIDO_MS,
    );
    return () => {
      clearTimeout(salir);
      clearTimeout(desmontar);
    };
  }, []);

  if (!loading) return null;

  // Mismo brillo radial en tinta que las cabeceras y el pie de página, foco
  // centrado porque aquí el logo también está centrado en toda la pantalla.
  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[radial-gradient(140%_140%_at_50%_45%,var(--brand-strong)_0%,var(--ink)_100%)] transition-opacity ease-in-out ${
        saliendo ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${DESVANECIDO_MS}ms` }}
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative mb-8 h-14 w-40"
        >
          <Image
            src="/ASTA LOGO.png"
            alt="ASTA"
            fill
            sizes="160px"
            className="object-contain brightness-0 invert"
            priority
          />
        </motion.div>

        {/* La barra recorre los mismos tres canales que la tira de control
            del resto del sitio, no un azul genérico. */}
        <div className="h-[3px] w-56 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: DURACION_MS / 1000, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-[var(--process-c)] via-[var(--process-m)] to-[var(--process-y)]"
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 font-mono text-[10px] uppercase tracking-[0.4em] text-slate-400"
        >
          Ingeniería en Impresión
        </motion.p>
      </div>
    </div>
  );
};
