'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    alert('¡Gracias! Nos pondremos en contacto pronto.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <>
      <Navbar />
      <main className="bg-[#f3f5f4] min-h-screen pt-24">
        {/* Header */}
        <section className="bg-gradient-to-r from-[#44abff] to-[#0b63cd] text-white py-12">
          <div className="container mx-auto px-6 max-w-7xl">
            <h1 className="text-4xl lg:text-5xl font-black mb-4">Contáctanos</h1>
            <p className="text-lg text-white/90">
              Estamos aquí para ayudarte con cualquier pregunta o solicitud
            </p>
          </div>
        </section>

        <div className="container mx-auto px-6 max-w-7xl py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Contact Info */}
            {[
              {
                icon: '📞',
                title: 'Teléfono',
                details: ['+58 (0) 212 XXX-XXXX', '+58 (0) 414 XXX-XXXX'],
              },
              {
                icon: '📧',
                title: 'Email',
                details: ['info@asta.com.ve', 'ventas@asta.com.ve'],
              },
              {
                icon: '📍',
                title: 'Oficina',
                details: ['Caracas, Venezuela', 'Disponible de Lunes a Viernes 8am-5pm'],
              },
            ].map((contact, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-8 text-center shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <p className="text-5xl mb-4">{contact.icon}</p>
                <h3 className="text-2xl font-bold text-[#0b63cd] mb-4">{contact.title}</h3>
                {contact.details.map((detail, i) => (
                  <p key={i} className="text-gray-700 mb-2">
                    {detail}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-8 shadow-md border border-gray-100"
            >
              <h2 className="text-3xl font-bold text-[#0b63cd] mb-6">Envíanos un Mensaje</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#0b63cd] mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#44abff] focus:border-transparent"
                    placeholder="Tu nombre"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[#0b63cd] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#44abff] focus:border-transparent"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#0b63cd] mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#44abff] focus:border-transparent"
                      placeholder="+58 212 XXX-XXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#0b63cd] mb-2">
                    Asunto
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#44abff] focus:border-transparent"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="consulta">Consulta de Producto</option>
                    <option value="distribuidor">Quiero ser Distribuidor</option>
                    <option value="soporte">Soporte Técnico</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#0b63cd] mb-2">
                    Mensaje
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#44abff] focus:border-transparent resize-none"
                    placeholder="Escribe tu mensaje aquí..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full px-6 py-3 bg-[#0b63cd] text-white rounded-lg font-bold text-lg hover:bg-[#0b2d4d] transition-colors"
                >
                  Enviar Mensaje
                </motion.button>
              </form>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white rounded-lg p-8 shadow-md border border-gray-100">
                <h3 className="text-2xl font-bold text-[#0b63cd] mb-4">Programas ASTA</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Distribuidor Autorizado</h4>
                    <p className="text-gray-600">
                      Únete a nuestra red de distribuidores y obtén precios especiales, apoyo de marketing y capacitación.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Cliente Mayorista</h4>
                    <p className="text-gray-600">
                      Acceso a descuentos por volumen, términos de pago flexibles y entregas programadas.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Soporte Técnico 24/7</h4>
                    <p className="text-gray-600">
                      Contamos con un equipo dedicado para resolver cualquier duda sobre compatibilidad o uso.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#44abff] to-[#0b63cd] text-white rounded-lg p-8 shadow-md">
                <h3 className="text-2xl font-bold mb-4">¿Necesitas Respuesta Rápida?</h3>
                <p className="mb-4">
                  Llama directamente a nuestro equipo de ventas para consultas inmediatas.
                </p>
                <p className="text-xl font-bold">+58 (0) 212 XXX-XXXX</p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
