# 📖 GUÍA DE USO - ASTA WEB

## 🎯 ACCESO RÁPIDO

Tu página web está completamente funcional y disponible en:
- **Local:** http://localhost:3000
- **Catálogo:** http://localhost:3000/catalog
- **Sobre Nosotros:** http://localhost:3000/about
- **Contacto:** http://localhost:3000/contact

---

## 🏠 PÁGINA DE INICIO (`/`)

### Qué encontrarás:

1. **Hero Section**
   - Logo ASTA profesional
   - Título principal con gradiente
   - Descripción de la marca
   - 2 botones CTA (Catálogo y Contacto)
   - Estadísticas clave (200+ productos, 8 marcas, 30K+ clientes)
   - Imagen del banner con productos

2. **Por Qué Elegir ASTA**
   - 6 tarjetas con ventajas
   - Iconos visuales
   - Descripciones completas
   - Diseño responsivo

3. **Productos Destacados**
   - Grid de 8 productos
   - Imagen, nombre, categoría
   - Precio y stock visible
   - Botón para ver detalles
   - Hover effects dinámicos

4. **Marcas Compatibles**
   - 8 marcas con iconos
   - Número de productos soportados
   - Hover animations

5. **Cómo Funciona**
   - 4 pasos del proceso
   - Flechas entre pasos
   - Descripciones claras
   - Gradiente de fondo azul

6. **Testimonios**
   - 3 testimonios de clientes
   - Calificación de estrellas
   - Nombre y empresa
   - Comentarios reales

7. **Preguntas Frecuentes**
   - 6 FAQs expandibles
   - Respuestas detalladas
   - Temas cubiertos: garantía, compatibilidad, entregas, descuentos, distribuidor

8. **Sección Mascota**
   - Imagen de panda ASTA
   - Información sobre la mascota
   - Características y beneficios
   - Fondo con gradiente

9. **CTA Final**
   - Llamada a acción grande
   - Botones destacados
   - Información de contacto
   - Email, teléfono, website

10. **Footer**
    - Logo ASTA
    - Enlaces a productos
    - Enlaces a empresa
    - Redes sociales
    - Copyright

---

## 🛍️ CATÁLOGO (`/catalog`)

### Funcionalidades:

1. **Filtros Laterales**
   - **Buscar:** Por nombre o código de producto
   - **Categorías:** Filtra por tipo de consumible
   - **Ordenamiento:** Por nombre, precio o stock

2. **Grid de Productos**
   - Vista de 3 columnas (desktop)
   - 2 columnas (tablet)
   - 1 columna (mobile)
   - Animaciones suaves

3. **Tarjetas de Producto**
   - Imagen del producto
   - Nombre y categoría
   - Código de referencia
   - Precio destacado
   - Stock disponible
   - Botón "Ver Detalles"

4. **Búsqueda Dinámica**
   - Busca mientras escribes
   - Busca por nombre completo o parcial
   - Busca por código exacto

5. **Estadísticas**
   - Muestra cantidad de productos encontrados
   - Actualiza con cada filtro

---

## ℹ️ SOBRE NOSOTROS (`/about`)

### Contenido:

1. **Nuestra Historia**
   - Fundación en 1995
   - Evolución de la marca
   - Posición en el mercado
   - Compromiso con la calidad

2. **Nuestros Valores (6)**
   - ⭐ Calidad
   - 🤝 Confiabilidad
   - 🚀 Innovación
   - 💰 Valor
   - ♻️ Sostenibilidad
   - 📚 Educación

3. **Estadísticas Clave**
   - 30+ años de experiencia
   - 200+ productos
   - 30K+ clientes
   - 8 marcas soportadas

4. **Nuestro Equipo**
   - 👔 Gerencia General
   - 📊 Equipo de Ventas
   - 🔧 Soporte Técnico

5. **CTA Final**
   - Invitación a ser distribuidor
   - Botón de solicitud de información

---

## 📧 CONTACTO (`/contact`)

### Información de Contacto:

1. **Tarjetas de Contacto**
   - 📞 Teléfono: +58 (0) 212 XXX-XXXX
   - 📧 Email: info@asta.com.ve
   - 📍 Oficina: Caracas, Venezuela

2. **Formulario de Contacto**
   - Campo Nombre (requerido)
   - Campo Email (requerido)
   - Campo Teléfono (opcional)
   - Selector de Asunto:
     * Consulta de Producto
     * Quiero ser Distribuidor
     * Soporte Técnico
     * Otro
   - Área de Mensaje (requerido)
   - Botón Enviar

3. **Programas ASTA**
   - Distribuidor Autorizado
   - Cliente Mayorista
   - Soporte Técnico 24/7

4. **Número de Emergencia**
   - Teléfono destacado
   - Para consultas inmediatas

---

## 🎨 NAVEGACIÓN

### Navbar (en todas las páginas)

1. **Logo ASTA**
   - Click para ir al inicio
   - Hover con efectos

2. **Menú de Navegación** (Desktop)
   - Inicio
   - Catálogo
   - Sobre Nosotros
   - Contacto

3. **Botón Contactar** (Desktop)
   - Enlace directo a página de contacto

4. **Menú Hamburguesa** (Mobile)
   - Click para abrir/cerrar
   - Animaciones suaves
   - Todos los enlaces

---

## 💻 CARACTERÍSTICAS TÉCNICAS

### Responsive Design:
- ✅ Funciona perfectamente en móvil
- ✅ Optimizado para tablet
- ✅ Experiencia completa en desktop
- ✅ Imágenes adaptativas

### Animaciones:
- Fade-in al cargar secciones
- Hover effects en tarjetas
- Transiciones suaves
- Staggered animations
- Parallax scroll

### Rendimiento:
- Carga rápida
- Imágenes optimizadas
- Código limpio
- Sin dependencias innecesarias

### Accesibilidad:
- Contraste de colores optimizado
- Navegación clara
- Textos legibles
- Botones grandes

---

## 🔧 PERSONALIZACIÓN BÁSICA

### Cambiar Información de Contacto:

**En `/app/contact/page.tsx` y `/app/page.tsx`:**

Busca y reemplaza:
```
+58 (0) 212 XXX-XXXX → Tu teléfono
info@asta.com.ve → Tu email
Caracas, Venezuela → Tu ubicación
```

### Cambiar Colores:

Reemplaza globalmente:
- `#44abff` → Azul primario
- `#0b63cd` → Azul secundario
- `#f3f5f4` → Gris de fondo

### Agregar Nuevos Productos:

Edita `/lib/products.ts`:
```typescript
{
  id: 'A-NUEVO',
  name: 'Nuevo Producto',
  category: 'Tóneres HP',
  description: 'Descripción',
  price: 29.99,
  stock: 150,
  image: 'URL-imagen',
  specs: { /* especificaciones */ }
}
```

---

## 📱 PRUEBAS EN DIFERENTES DISPOSITIVOS

### Mobile (< 640px):
- Menu hamburguesa activado ✅
- Una columna de productos ✅
- Botones fullwidth ✅
- Textos legibles ✅

### Tablet (640px - 1024px):
- Menu desktop opcional ✅
- Dos columnas de productos ✅
- Grid adaptado ✅

### Desktop (> 1024px):
- Menu completo ✅
- Tres columnas de productos ✅
- Layout óptimo ✅

---

## 🚀 DESPLIEGUE

### En Vercel (Recomendado):

1. Crea cuenta en vercel.com
2. Conecta tu repositorio GitHub
3. Deploy automático
4. Dominios personalizados disponibles

### Localmente:

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Build de producción
pnpm build
pnpm start
```

---

## 🎯 PRÓXIMOS PASOS

### Corto Plazo:
1. ✅ Revisar contenido
2. ✅ Cambiar teléfono y email
3. ✅ Desplegar en Vercel

### Mediano Plazo:
1. Agregar más productos
2. Configurar Google Analytics
3. Agregar sitemap.xml
4. Configurar robots.txt

### Largo Plazo:
1. Sistema de carrito
2. Integración de pagos
3. Chat en vivo
4. Newsletter

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### La página no carga:
1. Verifica que el servidor esté corriendo: `pnpm dev`
2. Abre http://localhost:3000
3. Revisa la consola del navegador

### Los estilos no se aplican:
1. Limpia cache: Ctrl+Shift+R
2. Reinicia el servidor
3. Comprueba que Tailwind esté instalado

### Las imágenes no carga:
1. Verifica las URLs en `/lib/products.ts`
2. Revisa que las imágenes sean públicas
3. Comprueba los permisos de acceso

---

## 📚 DOCUMENTACIÓN ADICIONAL

- **README.md** - Información general
- **DEPLOYMENT.md** - Guía de despliegue detallada
- **CUSTOMIZATION.md** - Personalización avanzada
- **PROYECTO_COMPLETO.md** - Resumen del proyecto
- **QUICKSTART.md** - Inicio rápido

---

## 🎉 ¡LISTO!

Tu página web ASTA está completa y lista para usar. Solo necesitas:

1. ✅ Verificar contenido
2. ✅ Personalizar datos
3. ✅ Desplegar

**¡Muchas gracias por usar ASTA Web!** 🚀
