"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Send, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// 🐼 Devuelve un sessionId persistente por navegador.
// Se guarda en localStorage para que la conversación se recuerde
// incluso si el usuario cierra y vuelve a abrir la página.
const getSessionId = () => {
  let id = localStorage.getItem("asta_session");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("asta_session", id);
  }
  return id;
};

// 🛒 Base de la página de cada producto. El SKU (code) se concatena al final.
const PRODUCT_BASE_URL = "https://astavenezuela.com/producto/";

// 💬 Persistencia del chat en el navegador (sobrevive al recargar la página).
const CHAT_STORAGE_KEY = "asta_messages";
const DEFAULT_MESSAGES = [
  {
    id: 1,
    text: "¡Hola! Soy el Panda. ¿En qué puedo ayudarte hoy?",
    sender: "bot",
  },
];

// 🖼️ El endpoint de búsqueda no trae imagen, pero el listado completo sí
// (campo "image": base64 "data:image/..." o "/placeholder.jpg").
// Cargamos ese listado UNA sola vez y lo cacheamos a nivel de módulo,
// para construir un mapa code -> imagen sin volver a pedirlo.
const PRODUCTS_API_URL = "https://astavenezuela.com/api/productos";

let imageCache: Record<string, string> | null = null;
let imagePromise: Promise<Record<string, string>> | null = null;

const fetchProductImages = (): Promise<Record<string, string>> => {
  if (imageCache) return Promise.resolve(imageCache);
  if (imagePromise) return imagePromise;

  imagePromise = fetch(PRODUCTS_API_URL)
    .then((r) => r.json())
    .then((list: Array<{ code?: string; image?: string }>) => {
      const map: Record<string, string> = {};
      if (Array.isArray(list)) {
        for (const p of list) {
          if (p?.code && p?.image) map[p.code] = p.image;
        }
      }
      imageCache = map;
      return map;
    })
    .catch(() => {
      imagePromise = null; // permite reintentar en el próximo mensaje
      return {};
    });

  return imagePromise;
};

// Convierte el valor del campo image en un src usable, o null para usar fallback.
const resolveImage = (img?: string): string | null => {
  if (!img) return null;
  if (img === "/placeholder.jpg") return null; // sin foto real -> fallback
  if (img.startsWith("data:") || img.startsWith("http")) return img;
  return `https://astavenezuela.com${img.startsWith("/") ? "" : "/"}${img}`;
};

// 🃏 Card individual de un producto.
const ProductCard = ({
  name,
  desc,
  code,
  images,
}: {
  name: string;
  desc?: string;
  code: string;
  images: Record<string, string>;
}) => {
  const src = resolveImage(images[code]);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col gap-2 shadow-sm">
      <div className="flex gap-3">
        <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-white border border-slate-200 flex items-center justify-center">
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={name}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          ) : (
            <Image
              src="/Chatbot.png"
              alt={name}
              width={48}
              height={48}
              className="object-contain opacity-50 p-1"
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-slate-800 text-sm leading-tight">
            {name}
          </p>
          {desc && (
            <p className="text-xs text-slate-500 mt-1 leading-snug">{desc}</p>
          )}
        </div>
      </div>
      <a
        href={`${PRODUCT_BASE_URL}${encodeURIComponent(code)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="self-start text-xs font-bold text-white bg-[#0b63cd] hover:bg-[#0950a8] px-3 py-1.5 rounded-lg transition-colors"
      >
        Ver más
      </a>
    </div>
  );
};

// 🐼 Renderiza el texto del bot. Las líneas con el marcador [[PRODUCTO]]
// se convierten en cards (nombre, descripción, imagen y botón "Ver más").
// El resto del texto se muestra como párrafos normales.
const renderBotMessage = (text: string, images: Record<string, string>) => {
  const lines = text.split("\n");

  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        const trimmed = line.trim();

        if (trimmed.startsWith("[[PRODUCTO]]")) {
          const body = trimmed.replace("[[PRODUCTO]]", "").trim();
          const [name, desc, code] = body.split("|").map((s) => s.trim());

          if (name && code) {
            return (
              <ProductCard
                key={i}
                name={name}
                desc={desc}
                code={code}
                images={images}
              />
            );
          }
        }

        if (!trimmed) return null;
        return (
          <p key={i} className="whitespace-pre-wrap">
            {line}
          </p>
        );
      })}
    </div>
  );
};

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(DEFAULT_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [productImages, setProductImages] = useState<Record<string, string>>(
    {},
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // Carga el historial guardado al montar (para que sobreviva al recargar).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          // Si el historial tiene productos, recargamos sus imágenes.
          if (
            parsed.some(
              (m) => typeof m.text === "string" && m.text.includes("[[PRODUCTO]]"),
            )
          ) {
            fetchProductImages().then(setProductImages);
          }
        }
      }
    } catch {
      // Si algo falla, se queda con el saludo por defecto.
    }
  }, []);

  // Guarda el historial cada vez que cambian los mensajes.
  useEffect(() => {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Ignoramos errores de cuota/almacenamiento.
    }
  }, [messages]);

  // Limpia el chat: vuelve al saludo y arranca una conversación nueva.
  const handleClear = () => {
    setMessages(DEFAULT_MESSAGES);
    try {
      localStorage.removeItem(CHAT_STORAGE_KEY);
      // Reiniciamos la sesión para que la memoria del bot también empiece de cero.
      localStorage.removeItem("asta_session");
    } catch {
      // Ignoramos errores de almacenamiento.
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(
        "https://n8n.supricom.com.ve/webhook/asta-chat-web/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // 👇 Ahora mandamos el payload que n8n espera:
          // action + sessionId (para la memoria) + chatInput (el mensaje)
          body: JSON.stringify({
            action: "sendMessage",
            sessionId: getSessionId(),
            chatInput: userMsg.text,
          }),
        },
      );
      const data = await res.json();
      // El Chat Trigger puede responder como objeto o como array; cubrimos ambos.
      const payload = Array.isArray(data) ? data[0] : data;
      const reply =
        payload?.output ??
        payload?.text ??
        payload?.message ??
        payload?.response ??
        "No pude obtener una respuesta. Intenta de nuevo.";

      // Si la respuesta trae productos, aseguramos cargar el mapa de imágenes.
      if (typeof reply === "string" && reply.includes("[[PRODUCTO]]")) {
        fetchProductImages().then(setProductImages);
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: reply, sender: "bot" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Hubo un error al conectar con el asistente. Por favor intenta más tarde.",
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Ajustamos el contenedor a "items-end" para que todo se alinee a la derecha
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            // mb-6 para dar espacio entre la ventana y el botón grande
            className="mb-6 w-[350px] sm:w-[450px] h-[600px] bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(11,99,205,0.2)] border border-slate-100 overflow-hidden flex flex-col"
          >
            {/* Header del Chat */}
            <div className="p-6 bg-gradient-to-r from-[#000000] to-[#0b63cd] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-15 h-15 bg-white rounded-full overflow-hidden border-2 border-white/20">
                  <Image
                    src="/Chatbot.png"
                    alt="ASTA Bot"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-wider leading-none">
                    Pandita
                  </h3>
                  <span className="text-[10px] opacity-80 flex items-center gap-1">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    En línea
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleClear}
                  title="Limpiar chat"
                  aria-label="Limpiar chat"
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Cerrar chat"
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Cuerpo de Mensajes */}
            <div
              ref={scrollRef}
              className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium ${
                      msg.sender === "user"
                        ? "bg-[#0b63cd] text-white rounded-tr-none shadow-lg shadow-blue-900/10"
                        : "bg-white text-slate-700 rounded-tl-none border border-slate-100 shadow-sm"
                    }`}
                  >
                    {msg.sender === "bot"
                      ? renderBotMessage(msg.text, productImages)
                      : msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-slate-400 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm p-4 flex gap-1 items-center">
                    <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input de Mensaje */}
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Escribe tu duda aquí..."
                  className="w-full pl-4 pr-12 py-3 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#0b63cd] transition-all outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-2 p-2 text-[#0b63cd] hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[9px] text-center text-slate-400 mt-3 font-bold uppercase tracking-widest">
                Ingeniería en Impresión ASTA
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón Disparador - AUMENTADO de w-16 h-16 a w-24 h-24 */}
      {/* Botón Disparador - Estático y Profesional */}
      <motion.button
        // Eliminamos el whileHover de escala para que no haga zoom
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-30 h-30 bg-white rounded-full shadow-[0_15px_40px_rgba(11,99,205,0.4)] flex items-center justify-center overflow-hidden border-4 border-blue-50 group transition-all"
      >
        <Image
          src="/Chatbot.png"
          alt="Abrir Chat"
          fill
          // Eliminamos group-hover:scale-110 aquí
          className="object-cover p-1 transition-transform duration-300"
          priority
        />
        {/* Un sutil overlay de color al pasar el mouse en lugar de zoom */}
        <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>
    </div>
  );
};
