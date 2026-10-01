"use client";

import { ChannelMark } from "@/components/ControlStrip";
import { motion } from "framer-motion";
import Link from "next/link";

export interface BannerProps {
  canal: "c" | "m" | "y" | "k";
  /** Dato que el comprador compara de verdad: rendimiento, cobertura, años. */
  dato: string;
  titulo: string;
  descripcion: string;
  href: string;
  /** Texto del enlace. Debe decir qué pasa al pulsarlo, no "Ver más". */
  accion: string;
  /** En oscuro para los banners sobre secciones de tinta. */
  tono?: "claro" | "oscuro";
  indice?: number;
}

export function Banner({
  canal,
  dato,
  titulo,
  descripcion,
  href,
  accion,
  tono = "claro",
  indice = 0,
}: BannerProps) {
  const oscuro = tono === "oscuro";

  return (
    <motion.div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border p-6 transition-colors ${
        oscuro
          ? "border-white/10 bg-ink-soft hover:border-white/25"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <div>
        <ChannelMark canal={canal} className="mb-5" />

        {/* El dato va en monoespaciada: es una cifra para comparar, no prosa. */}
        <p
          className={`font-mono text-3xl leading-none tracking-tight ${
            oscuro ? "text-white" : "text-ink"
          }`}
        >
          {dato}
        </p>

        <h2
          className={`mt-3 font-display text-lg font-extrabold leading-tight ${
            oscuro ? "text-white" : "text-ink"
          }`}
        >
          {titulo}
        </h2>

        <p
          className={`mt-2 text-sm leading-relaxed ${
            oscuro ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {descripcion}
        </p>
      </div>

      <Link
        href={href}
        className={`mt-3 inline-flex min-h-11 items-center gap-2 self-start text-sm font-bold ${
          oscuro
            ? "text-white focus-on-brand"
            : "text-brand-strong hover:text-brand-darker"
        }`}
      >
        {accion}
        <span
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    </motion.div>
  );
}
