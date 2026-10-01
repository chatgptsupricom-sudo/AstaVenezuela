"use client";

import { Banner } from "@/components/Banner";
import { ControlPatches, ControlStrip } from "@/components/ControlStrip";
import { Navbar } from "@/components/Navbar";
import { enlaceWhatsApp, MENSAJE_GENERAL } from "@/lib/whatsapp";
import { motion } from "framer-motion";
import { CheckCircle2, Globe, Mail, Phone, Send } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const ASUNTOS = ["consulta", "distribuidor", "soporte", "otro"] as const;

const VACIO = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  // Solo para "distribuidor": lo mínimo para preparar condiciones.
  negocio: "",
  ciudad: "",
  volumen: "",
};

// Mismo estilo para todos los campos. Esquinas rounded-xl como el resto del
// sitio (antes eran píldoras de 2rem).
const CAMPO =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 font-semibold text-slate-900 placeholder:text-slate-500 transition-colors focus:border-brand-strong focus:ring-2 focus:ring-brand-strong/30 disabled:opacity-50";
const ETIQUETA =
  "text-xs font-black uppercase tracking-[0.2em] text-slate-600";

function Campo({
  id,
  etiqueta,
  opcional,
  children,
}: {
  id: string;
  etiqueta: string;
  opcional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className={ETIQUETA}>
        {etiqueta}
        {opcional && (
          <span className="ml-1 font-medium normal-case tracking-normal text-slate-500">
            (opcional)
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

function Contacto() {
  const params = useSearchParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [formData, setFormData] = useState(VACIO);

  // /contact?asunto=distribuidor (o soporte, consulta…) deja el asunto ya
  // elegido. Es a donde apuntan todos los enlaces de "ser distribuidor" del
  // sitio. Reacciona también a los banners de esta misma página, que cambian
  // el parámetro sin recargar.
  const asuntoUrl = params.get("asunto");
  useEffect(() => {
    if (asuntoUrl && (ASUNTOS as readonly string[]).includes(asuntoUrl)) {
      setFormData((prev) => ({ ...prev, subject: asuntoUrl }));
      setIsSubmitted(false);
    }
  }, [asuntoUrl]);

  const esDistribuidor = formData.subject === "distribuidor";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const elegirDistribucion = () => {
    setFormData((prev) => ({ ...prev, subject: "distribuidor" }));
    document.getElementById("contacto-name")?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setSendError(false);

    // Los campos de distribuidor solo viajan si el asunto lo es.
    const datos = esDistribuidor
      ? formData
      : { ...formData, negocio: "", ciudad: "", volumen: "" };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      if (!response.ok) throw new Error("Error en la petición de envío");

      // El aviso de éxito se queda: antes desaparecía a los 4 s y el
      // visitante no sabía si el envío había funcionado.
      setIsSubmitted(true);
      setFormData(VACIO);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setSendError(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen pt-24 overflow-hidden">
        {/* Base en --ink con brillo radial hacia --brand-strong: texto blanco
            entre 5,71:1 y 17,48:1 en cualquier punto del degradado. */}
        <section className="bg-[radial-gradient(140%_140%_at_12%_15%,var(--brand-strong)_0%,var(--ink)_100%)] py-14 text-white">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="mb-6 flex items-center gap-3">
              <ControlPatches />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-white">
                Respuesta en horario laboral
              </span>
            </div>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-none tracking-tight [font-stretch:115%]">
              Contacto
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white">
              Dinos qué impresora tienes y qué necesitas. Te decimos qué
              consumible le corresponde y en qué presentación.
            </p>
          </div>
        </section>

        <ControlStrip alto="h-2" />

        {/* Banners por tipo de consulta: cada uno llega con una pregunta
            distinta. Los de distribución y soporte dejan el asunto elegido
            y bajan directo al formulario. */}
        <div className="bg-surface py-10">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Banner
                canal="c"
                dato="Compra"
                titulo="Necesito un consumible"
                descripcion="Busca por código o por modelo de impresora y pide cotización."
                href="/catalog"
                accion="Ir al catálogo"
              />
              <Banner
                canal="m"
                dato="Distribución"
                titulo="Quiero vender ASTA"
                descripcion="Condiciones para centros de copiado, mayoristas y puntos de venta."
                href="/contact?asunto=distribuidor#solicitud"
                accion="Escribir al equipo"
              />
              <Banner
                canal="y"
                dato="Soporte"
                titulo="Tengo un problema técnico"
                descripcion="Rendimiento por debajo de lo esperado, chips o compatibilidad."
                href="/contact?asunto=soporte#solicitud"
                accion="Reportar el caso"
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* --- CANALES (LADO IZQUIERDO) --- */}
            <div className="space-y-10 lg:col-span-4">
              <div className="space-y-6">
                <h2 className="font-display text-3xl font-black uppercase tracking-tight text-ink [font-stretch:115%]">
                  Canales Directos
                </h2>

                {/* WhatsApp primero: es el canal de cotización. */}
                <a
                  href={enlaceWhatsApp(MENSAJE_GENERAL)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-14 items-center justify-center gap-3 rounded-xl bg-whatsapp px-6 py-4 text-base font-black text-white transition-colors hover:bg-whatsapp-dark"
                >
                  <Image src="/whatsapp-wh.png" alt="" width={22} height={22} />
                  Cotizar por WhatsApp
                </a>

                {[
                  {
                    icono: Phone,
                    titulo: "Llámanos",
                    valor: "+58 (422)-8008204",
                    href: "tel:+584228008204",
                  },
                  {
                    icono: Mail,
                    titulo: "Escríbenos",
                    valor: "webstore@astavenezuela.com",
                    href: "mailto:webstore@astavenezuela.com",
                    nota: "Respuesta en menos de 24h",
                  },
                  {
                    icono: Globe,
                    titulo: "Cobertura",
                    valor: "Toda Venezuela",
                    nota: "Distribución nacional garantizada",
                  },
                ].map(({ icono: Icono, titulo, valor, href, nota }) => (
                  <div key={titulo} className="flex items-start gap-5">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand-strong">
                      <Icono size={20} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-900">
                        {titulo}
                      </h3>
                      {href ? (
                        <a
                          href={href}
                          className="break-words text-lg font-semibold text-brand-strong underline-offset-4 hover:underline"
                        >
                          {valor}
                        </a>
                      ) : (
                        <p className="text-lg font-semibold text-slate-600">
                          {valor}
                        </p>
                      )}
                      {nota && <p className="text-sm text-slate-500">{nota}</p>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-brand-strong p-8 text-white">
                <h3 className="mb-4 text-xl font-bold">
                  ¿Quieres ser distribuidor?
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-white/90">
                  Únete a la red de aliados más grande del país y obtén
                  beneficios exclusivos de la marca #1.
                </p>
                <button
                  type="button"
                  onClick={elegirDistribucion}
                  className="focus-on-brand w-full rounded-xl bg-white py-3 text-xs font-black uppercase tracking-widest text-brand-strong transition-colors hover:bg-surface-alt"
                >
                  Saber más
                </button>
              </div>
            </div>

            {/* --- FORMULARIO (LADO DERECHO) ---
                scroll-mt: el navbar fijo mide 80px; sin margen, el ancla
                #solicitud dejaba el título del formulario debajo de él. */}
            <div
              id="solicitud"
              className="scroll-mt-28 lg:col-span-8"
            >
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(10,26,47,0.06)] sm:p-10 md:p-12">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    role="status"
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="mb-8 flex size-24 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <CheckCircle2 size={48} aria-hidden="true" />
                    </div>
                    <h2 className="mb-3 text-4xl font-black text-slate-900">
                      Solicitud Enviada
                    </h2>
                    <p className="text-lg font-medium text-slate-600">
                      Un asesor especializado se pondrá en contacto con usted.
                    </p>
                    <p className="mt-2 text-slate-600">
                      ¿Lo necesitas antes? Escríbenos por WhatsApp.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <a
                        href={enlaceWhatsApp(MENSAJE_GENERAL)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-12 items-center justify-center gap-3 rounded-xl bg-whatsapp px-6 font-bold text-white hover:bg-whatsapp-dark"
                      >
                        <Image src="/whatsapp-wh.png" alt="" width={20} height={20} />
                        Escribir por WhatsApp
                      </a>
                      <button
                        type="button"
                        onClick={() => setIsSubmitted(false)}
                        className="min-h-12 rounded-xl border border-slate-300 px-6 font-bold text-ink hover:bg-slate-50"
                      >
                        Enviar otra solicitud
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-10">
                      <h2 className="mb-3 font-display text-3xl font-black uppercase tracking-tight text-ink [font-stretch:115%] sm:text-4xl">
                        Gestión de Solicitudes
                      </h2>
                      <p className="text-lg font-medium text-slate-600">
                        Inicie una conversación con nuestro equipo corporativo.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <Campo id="contacto-name" etiqueta="Nombre Completo">
                          <input
                            type="text"
                            id="contacto-name"
                            name="name"
                            autoComplete="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={isSending}
                            className={CAMPO}
                            placeholder="Nombre Apellido"
                          />
                        </Campo>
                        <Campo id="contacto-email" etiqueta="Email Corporativo">
                          <input
                            type="email"
                            id="contacto-email"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={isSending}
                            className={CAMPO}
                            placeholder="correo@empresa.com"
                          />
                        </Campo>
                      </div>

                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <Campo id="contacto-phone" etiqueta="Teléfono" opcional>
                          <input
                            type="tel"
                            id="contacto-phone"
                            name="phone"
                            autoComplete="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={isSending}
                            className={CAMPO}
                            placeholder="+58 4XX XXXXXXX"
                          />
                        </Campo>
                        <Campo id="contacto-subject" etiqueta="Asunto">
                          <select
                            id="contacto-subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            disabled={isSending}
                            className={`${CAMPO} cursor-pointer`}
                          >
                            <option value="">Seleccionar...</option>
                            <option value="consulta">Consulta de Producto</option>
                            <option value="distribuidor">
                              Alianza de Distribución
                            </option>
                            <option value="soporte">Soporte Técnico</option>
                            <option value="otro">Otro Asunto</option>
                          </select>
                        </Campo>
                      </div>

                      {/* Solo para distribución: lo que el equipo necesita
                          para preparar condiciones sin una segunda ronda. */}
                      {esDistribuidor && (
                        <fieldset className="grid grid-cols-1 gap-8 rounded-xl border border-dashed border-slate-300 p-5 md:grid-cols-3 md:items-end">
                          <legend className={`${ETIQUETA} px-2`}>
                            Sobre tu negocio
                          </legend>
                          <Campo id="contacto-negocio" etiqueta="Tipo de negocio">
                            <select
                              id="contacto-negocio"
                              name="negocio"
                              value={formData.negocio}
                              onChange={handleChange}
                              required
                              disabled={isSending}
                              className={`${CAMPO} cursor-pointer`}
                            >
                              <option value="">Seleccionar...</option>
                              <option>Tienda de tecnología</option>
                              <option>Centro de copiado</option>
                              <option>Imprenta</option>
                              <option>Distribuidor o mayorista</option>
                              <option>Otro</option>
                            </select>
                          </Campo>
                          <Campo id="contacto-ciudad" etiqueta="Ciudad">
                            <input
                              type="text"
                              id="contacto-ciudad"
                              name="ciudad"
                              autoComplete="address-level2"
                              value={formData.ciudad}
                              onChange={handleChange}
                              required
                              disabled={isSending}
                              className={CAMPO}
                              placeholder="Ej. Valencia"
                            />
                          </Campo>
                          <Campo
                            id="contacto-volumen"
                            etiqueta="Volumen mensual"
                            opcional
                          >
                            <select
                              id="contacto-volumen"
                              name="volumen"
                              value={formData.volumen}
                              onChange={handleChange}
                              disabled={isSending}
                              className={`${CAMPO} cursor-pointer`}
                            >
                              <option value="">Seleccionar...</option>
                              <option>Menos de 50 unidades</option>
                              <option>50 a 200 unidades</option>
                              <option>Más de 200 unidades</option>
                            </select>
                          </Campo>
                        </fieldset>
                      )}

                      <Campo id="contacto-message" etiqueta="¿Cómo podemos ayudarte?">
                        <textarea
                          id="contacto-message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          disabled={isSending}
                          rows={4}
                          className={`${CAMPO} resize-none`}
                          placeholder="Escriba aquí su requerimiento..."
                        />
                      </Campo>

                      {sendError && (
                        <p
                          role="alert"
                          className="rounded-xl bg-red-50 px-6 py-4 text-sm font-semibold text-red-700"
                        >
                          No pudimos enviar tu solicitud. Revisa tu conexión e
                          inténtalo de nuevo, o escríbenos a{" "}
                          <a
                            href="mailto:webstore@astavenezuela.com"
                            className="underline"
                          >
                            webstore@astavenezuela.com
                          </a>{" "}
                          o por{" "}
                          <a
                            href={enlaceWhatsApp(MENSAJE_GENERAL)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            WhatsApp
                          </a>
                          .
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={isSending}
                        className="flex w-full items-center justify-center gap-3 rounded-xl bg-ink py-5 text-sm font-black uppercase tracking-[0.15em] text-white transition-colors hover:bg-brand-strong disabled:cursor-not-allowed disabled:bg-slate-400"
                      >
                        <Send size={18} aria-hidden="true" />
                        {isSending ? "Enviando..." : "Enviar Solicitud"}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// useSearchParams necesita un <Suspense> por encima en el App Router; sin él
// el build falla al prerenderizar la página.
export default function ContactPage() {
  return (
    <Suspense>
      <Contacto />
    </Suspense>
  );
}
