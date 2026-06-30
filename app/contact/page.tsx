"use client";

import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { CheckCircle2, Globe, Mail, Phone, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Simulación de envío
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen pt-24 overflow-hidden">
        {/* --- HEADER SECCIÓN --- */}
        <section className="relative py-24 bg-slate-50">
          <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tighter">
                Conectamos con{" "}
                <span className="text-blue-600">toda Venezuela.</span>
              </h1>
              {/* <p className="text-xl lg:text-2xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
                Nuestra infraestructura logística nos permite prescindir de
                oficinas físicas para llegar directamente a ti. Llevamos la
                excelencia de ASTA a cada hogar y empresa del país con la
                rapidez que tu productividad exige.
              </p> */}
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-6 max-w-7xl py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* --- INFO DE CONTACTO (LADO IZQUIERDO) --- */}
            <div className="lg:col-span-4 space-y-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  Canales Directos
                </h2>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 uppercase text-xs tracking-widest mb-1">
                      Llámanos
                    </h4>
                    <p className="text-lg text-slate-600 font-semibold">
                      +58 (422)-8002024
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 uppercase text-xs tracking-widest mb-1">
                      Escríbenos
                    </h4>
                    <p className="text-lg text-slate-600 font-semibold">
                      info@asta.com.ve
                    </p>
                    <p className="text-sm text-slate-400">
                      Respuesta en menos de 24h
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 uppercase text-xs tracking-widest mb-1">
                      Cobertura
                    </h4>
                    <p className="text-lg text-slate-600 font-semibold">
                      Toda Venezuela
                    </p>
                    <p className="text-sm text-slate-400">
                      Distribución nacional garantizada
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Card informativa minimalista */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-8 rounded-[2rem] bg-blue-600 text-white shadow-2xl shadow-blue-200 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4">
                    ¿Quieres ser distribuidor?
                  </h3>
                  <p className="text-blue-100 mb-6 text-sm leading-relaxed">
                    Únete a la red de aliados más grande del país y obtén
                    beneficios exclusivos de la marca #1.
                  </p>
                  <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-colors">
                    Saber más
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              </motion.div>
            </div>

            {/* --- FORMULARIO (LADO DERECHO) --- */}
            {/* --- FORMULARIO CON SOMBRA MEJORADA --- */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8"
            >
              <div className="bg-white rounded-[3.5rem] p-10 md:p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border border-slate-100 relative overflow-hidden">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-8">
                      <CheckCircle2 size={48} />
                    </div>
                    <h3 className="text-4xl font-black text-slate-900 mb-3">
                      Solicitud Enviada
                    </h3>
                    <p className="text-lg text-slate-500 font-medium">
                      Un asesor especializado se pondrá en contacto con usted.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-12">
                      <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">
                        Gestión de Solicitudes
                      </h2>
                      <p className="text-lg text-slate-500 font-medium">
                        Inicie una conversación con nuestro equipo corporativo.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                            Nombre Completo
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2rem] focus:ring-2 focus:ring-blue-500 transition-all font-semibold text-slate-900 placeholder:text-slate-300"
                            placeholder="Ej. Riccardo Fusco"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                            Email Corporativo
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2rem] focus:ring-2 focus:ring-blue-500 transition-all font-semibold text-slate-900 placeholder:text-slate-300"
                            placeholder="correo@empresa.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                            Teléfono
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2rem] focus:ring-2 focus:ring-blue-500 transition-all font-semibold text-slate-900 placeholder:text-slate-300"
                            placeholder="+58 4XX XXXXXXX"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                            Asunto
                          </label>
                          <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2rem] focus:ring-2 focus:ring-blue-500 transition-all font-semibold text-slate-900 appearance-none cursor-pointer"
                          >
                            <option value="">Seleccionar...</option>
                            <option value="consulta">
                              Consulta de Producto
                            </option>
                            <option value="distribuidor">
                              Alianza de Distribución
                            </option>
                            <option value="soporte">Soporte Técnico</option>
                            <option value="otro">Otro Asunto</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                          ¿Cómo podemos ayudarte?
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          className="w-full px-8 py-6 bg-slate-50 border-none rounded-[2.5rem] focus:ring-2 focus:ring-blue-500 transition-all font-semibold text-slate-900 placeholder:text-slate-300 resize-none"
                          placeholder="Escriba aquí su requerimiento..."
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.01, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-blue-600 transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] hover:shadow-blue-500/30"
                      >
                        <Send size={20} />
                        Enviar Solicitud
                      </motion.button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
