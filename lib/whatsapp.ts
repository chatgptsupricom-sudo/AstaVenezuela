// Número de ventas por WhatsApp (+58 422 8008204). Es el canal principal de
// cotización (PRODUCT.md: "WhatsApp es la caja registradora"): todo enlace
// del sitio que lleve a WhatsApp pasa por aquí.
export const WHATSAPP_NUMERO = "584228008204";

export const enlaceWhatsApp = (mensaje: string) =>
  `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;

export const MENSAJE_GENERAL = "Hola, quiero cotizar consumibles ASTA.";

export const mensajeProducto = (nombre: string, codigo: string, url?: string) =>
  `Hola, quiero cotizar este producto:\n\n*Producto:* ${nombre}\n*Código:* ${codigo}` +
  (url ? `\n\nLink del producto: ${url}` : "");
