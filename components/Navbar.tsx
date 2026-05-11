"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Inicio", href: "/" },
    { label: "Catálogo", href: "/catalog" },
    { label: "Sobre Nosotros", href: "/about" },
    { label: "Contacto", href: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Optimizado */}
        <motion.a
          href="/"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative flex items-center"
        >
          <Image
            src="/ASTA LOGO.png"
            alt="ASTA Logo"
            width={110} // Tamaño ideal para el alto del Nav
            height={32}
            style={{ width: "auto", height: "80px" }} // Forzamos un alto fijo para alinear con el texto
            className="object-contain hover:brightness-110 transition-all"
            priority
          />
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item, idx) => (
            <motion.a
              key={idx}
              href={item.href}
              className="text-slate-600 font-bold text-sm tracking-wide hover:text-blue-600 transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        {/* CTA Button Minimalista */}
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 20px -10px rgba(11, 99, 205, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block px-8 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-600 transition-all"
        >
          Contactar
        </motion.button>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-blue-600"
        >
          <div className="space-y-1.5">
            <motion.span
              animate={
                mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }
              }
              className="w-6 h-0.5 bg-current block rounded-full"
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-current block rounded-full"
            />
            <motion.span
              animate={
                mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
              }
              className="w-6 h-0.5 bg-current block rounded-full"
            />
          </div>
        </motion.button>
      </div>

      {/* Mobile Menu con efecto Glass */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-100 absolute w-full shadow-xl"
        >
          <div className="flex flex-col gap-6 p-8">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="text-slate-900 font-black text-2xl tracking-tighter"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-blue-600/20">
              Contactar ahora
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
