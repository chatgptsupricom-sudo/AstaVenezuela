"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Send, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "¡Hola! Soy el Panda. ¿En qué puedo ayudarte hoy?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

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
          body: JSON.stringify({ message: userMsg.text }),
        }
      );
      const data = await res.json();
      const reply =
        data?.output ?? data?.text ?? data?.message ?? data?.response ??
        "No pude obtener una respuesta. Intenta de nuevo.";
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
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
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
                    className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium ${
                      msg.sender === "user"
                        ? "bg-[#0b63cd] text-white rounded-tr-none shadow-lg shadow-blue-900/10"
                        : "bg-white text-slate-700 rounded-tl-none border border-slate-100 shadow-sm"
                    }`}
                  >
                    {msg.text}
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
