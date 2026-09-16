"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
          aria-label="ASTA - Ir al inicio"
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
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-600 font-bold text-sm tracking-wide hover:text-blue-600 transition-colors relative group py-2"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* CTA Button Minimalista */}
        <Link
          href="/contact"
          className="hidden md:block px-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-600 transition-all"
        >
          Contactar
        </Link>

        {/* Mobile Menu Button */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileMenuOpen}
          aria-controls="menu-movil"
          className="md:hidden p-3 -mr-3 text-blue-600"
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
          id="menu-movil"
          className="md:hidden bg-white backdrop-blur-lg border-t border-slate-100 absolute w-full shadow-xl"
        >
          <nav className="flex flex-col gap-2 p-6" aria-label="Menú principal">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-center text-slate-600 font-black text-2xl py-3 rounded-xl hover:bg-slate-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full mt-4 py-4 bg-blue-600 text-white rounded-2xl text-lg font-bold text-center shadow-lg shadow-blue-600/20 focus-on-brand"
            >
              Contactar ahora
            </Link>
          </nav>
        </motion.div>
      )}
    </motion.nav>
  );
}
