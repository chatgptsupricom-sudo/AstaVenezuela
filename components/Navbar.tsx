'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Catálogo', href: '/catalog' },
    { label: 'Sobre Nosotros', href: '/about' },
    { label: 'Contacto', href: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-blue-100 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <motion.div
            className="w-10 h-10 rounded-full bg-gradient-to-br from-[#44abff] to-[#0b63cd] flex items-center justify-center text-white font-bold"
            whileHover={{ rotate: 10 }}
          >
            A
          </motion.div>
          <span className="text-lg font-black text-[#0b63cd] hidden sm:inline">ASTA</span>
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, idx) => (
            <motion.a
              key={idx}
              href={item.href}
              whileHover={{ color: '#0b63cd' }}
              className="text-gray-700 font-semibold text-sm hover:text-[#0b63cd] transition-colors"
            >
              {item.label}
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block px-6 py-2 bg-[#0b63cd] text-white rounded-full font-semibold text-sm hover:bg-[#0b2d4d] transition-colors"
        >
          Contactar
        </motion.button>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col gap-1 p-2"
        >
          <motion.span
            animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-[#0b63cd] block"
          />
          <motion.span
            animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-[#0b63cd] block"
          />
          <motion.span
            animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-[#0b63cd] block"
          />
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-blue-100"
        >
          <div className="flex flex-col gap-4 p-6">
            {navItems.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                whileHover={{ x: 5 }}
                className="text-gray-700 font-semibold hover:text-[#0b63cd] transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full px-6 py-2 bg-[#0b63cd] text-white rounded-full font-semibold hover:bg-[#0b2d4d] transition-colors mt-2"
            >
              Contactar
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
