# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Revendedores: tiendas de tecnología, centros de copiado, imprentas y distribuidores en Venezuela que compran consumibles ASTA para revender o para su operación diaria. Llegan con un código de cartucho o un modelo de impresora en mano y necesitan saber rápido si ASTA lo tiene, si hay stock y cuánto cuesta. La web es B2B: el comprador final de oficina o de casa no es el público principal.

## Product Purpose

Sitio de la marca ASTA (consumibles compatibles para impresoras: tóner, tintas, drums y chips) que muestra el catálogo real y convierte visitas en conversaciones de venta. Hay tres objetivos, en este orden:

1. **Cotizar por WhatsApp**: encontrar el consumible en el catálogo y pedir precio y disponibilidad por WhatsApp.
2. **Ser distribuidor**: solicitar condiciones para revender ASTA.
3. **Informar**: dar a conocer la marca y su respaldo.

Éxito = revendedores que encuentran su código y abren la conversación de WhatsApp, y nuevas solicitudes de distribución.

## Positioning

Marca de consumibles compatibles en Venezuela desde 1995, con más de 30.000 clientes atendidos, garantía con cambio inmediato y stock real visible en el catálogo. Atiende HP, Canon, Epson, Brother, Samsung y Xerox.

## Operating Context

- El catálogo sale en vivo de Odoo (`product.template`, marcas `spiff_brand_id` 951 y 925, categoría 2614): unos 162 productos.
- El stock es real (`qty_available`): la ficha muestra "En stock" o "Sin stock".
- Los precios de Odoo son de relleno (`list_price` = 1): no se publican precios; se cotiza por WhatsApp.
- Las fotos de producto vienen de Odoo o, si Odoo no tiene, de `public/productos` vía `lib/product-images.json`. Unos 35 productos no tienen foto.
- Marca y tipo de producto no existen como campos en Odoo; se deducen del nombre y del código en `lib/clasificar.ts`.
- Canales: WhatsApp +58 422 8008204 (`wa.me/584228008204`), teléfono +58 (422)-8008204, correo webstore@astavenezuela.com. Cobertura: toda Venezuela.
- Existe una tabla MySQL `compatibilidad_productos` (impresoras compatibles por `odoo_sku`) en el VPS; se probó en la ficha y el usuario decidió no mostrarla por ahora.

## Capabilities and Constraints

- Next.js (App Router) + Tailwind v4 + framer-motion; se despliega en un VPS con Docker.
- Búsqueda por código o nombre, filtros por marca y tipo, ficha de producto con stock, ficha técnica, productos de la misma familia y botón de cotizar por WhatsApp.
- Formulario de contacto (`/api/contact`) con asuntos: consulta de producto, alianza de distribución, soporte técnico y otro.
- Chatbot "Pandita" en todas las páginas.
- Términos del dominio: tóner, tinta/botella, drum (unidad de tambor), chip, "con chip / sin chip", código del cartucho original (OEM) como CF258A o CRG-054.
- Sin definir: precios públicos y condiciones concretas para distribuidores.

## Brand Commitments

- Nombre ASTA y su logo (`public/ASTA LOGO.png`).
- Mascota: el panda ASTA, símbolo de la marca desde 1995 (`public/ASTA MASCOTA.png`, `public/MascotaLentes.png`, `public/Chatbot2.jpeg`).
- Identidad de imprenta ya construida en el código: paleta de proceso CMYK y la "tira de control" de colores como sello de marca.

## Evidence on Hand

Confirmado por el usuario como verdadero y publicable:

- Testimonios reales: Carlos Rodríguez (Copias Rápidas SRL), María López (Imprenta Digital Plus) y Juan Pérez (Centro de Impresión Moderno).
- Más de 30.000 clientes atendidos; en el mercado desde 1995.
- Garantía con cambio inmediato si el producto falla.
- Certificación ISO 9001, envío en 24 h y +20 % de páginas de rendimiento.

No hay precios públicos, casos de estudio ni prensa: no inventarlos.

## Product Principles

1. El código manda: el revendedor busca por código de cartucho o modelo de impresora; todo debe llevarlo de ahí al producto en segundos.
2. Datos reales o nada: stock, fotos y cifras salen de Odoo o de hechos confirmados; nunca relleno, nunca precios ficticios.
3. WhatsApp es la caja registradora: cada producto termina en "Cotizar por WhatsApp" con el código ya escrito en el mensaje.
4. Confianza de proveedor, no de tienda: garantía, años en el mercado y testimonios de revendedores pesan más que la promoción.
