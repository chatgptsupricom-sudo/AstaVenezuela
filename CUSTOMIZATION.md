# Guía de Personalización - ASTA Web

Esta guía te ayudará a personalizar cada aspecto de la página web ASTA.

## 📝 Contenido de Texto

### Hero Section

**Archivo**: `app/page.tsx` (líneas 80-100)

```typescript
<h1 className="text-6xl font-black text-[#0b63cd] leading-tight mb-4">
  Soluciones de{' '}
  <span className="bg-gradient-to-r from-[#44abff] to-[#0b63cd] bg-clip-text text-transparent">
    Impresión Premium
  </span>
</h1>

<p className="text-xl text-gray-700 max-w-lg mb-8 leading-relaxed">
  Descubre la marca número 1 en consumibles para impresoras en Venezuela. Calidad, confiabilidad y rendimiento en cada producto.
</p>
```

**Cambiar a:**
```typescript
<h1 className="text-6xl font-black text-[#0b63cd] leading-tight mb-4">
  Tu Título Aquí
</h1>

<p className="text-xl text-gray-700 max-w-lg mb-8 leading-relaxed">
  Tu descripción aquí...
</p>
```

### Features Section

**Archivo**: `app/page.tsx` (líneas 169-190)

Array de features para editar:
```typescript
[
  {
    icon: '✨',
    title: 'Calidad Premium',
    description: 'Resultados tan nítidos y vibrantes como los originales.',
  },
  {
    icon: '⚡',
    title: 'Máximo Rendimiento',
    description: 'Más páginas, mejor eficiencia de costo en cada cartucho.',
  },
  {
    icon: '🎯',
    title: 'Amplia Compatibilidad',
    description: 'Compatible con todas las marcas líderes de impresoras.',
  },
]
```

### Productos

**Archivo**: `app/page.tsx` (líneas 29-40)

```typescript
const PRODUCTS = [
  { name: 'Tóner 105X HP', code: 'A-W1105A', category: 'Tóneres', icon: '🖨️' },
  // ... más productos
];
```

Para agregar más productos, sigue el formato:
```typescript
{
  name: 'Nombre del Producto',
  code: 'COD-123',
  category: 'Tóneres|Tintas|Accesorios',
  icon: '🖨️' // Emoji del producto
}
```

## 🎨 Colores y Diseño

### Cambiar Paleta de Colores

Los colores de ASTA están usados en todos los componentes:

**Azul Claro** `#44abff` → Cambiar a tu color primario
**Azul Oscuro** `#0b63cd` → Cambiar a tu color secundario
**Gris Claro** `#f3f5f4` → Cambiar a tu color de fondo

Para cambiar globalmente, busca y reemplaza en el proyecto:
```bash
# En terminal
grep -r "#44abff" . --include="*.tsx"
grep -r "#0b63cd" . --include="*.tsx"
grep -r "#f3f5f4" . --include="*.tsx"
```

O edita componente por componente:
```typescript
// Antes
className="bg-[#0b63cd] text-white"

// Después
className="bg-[#TU-COLOR] text-white"
```

### Cambiar Logo

**Opción 1: Usar archivo SVG**
1. Reemplazar `public/asta-logo.svg` con tu logo
2. El logo se carga en la línea 85 de `app/page.tsx`

**Opción 2: Usar imagen PNG/JPG**
1. Guardar imagen en `public/` (ej: `public/my-logo.png`)
2. Editar `app/page.tsx`:
```typescript
// Cambiar de:
<motion.img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/..." />

// A:
<motion.img src="/my-logo.png" alt="Logo" />
```

### Cambiar Mascota

La mascota Panda está en la URL: https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ASTA%20MASCOTA-hveQftSuOf6A9CH7k6WgmcCgg9meGz.png

Para usar tu propia mascota:

1. Subir imagen a un servidor de almacenamiento (Vercel Blob, AWS S3, etc.)
2. Actualizar URL en `app/page.tsx` (línea ~270):
```typescript
<motion.img
  src="https://tu-servidor.com/tu-mascota.png"
  alt="Tu Mascota"
  className="w-full max-w-md drop-shadow-2xl"
/>
```

## 🏢 Información de Empresa

### Metadata

**Archivo**: `app/layout.tsx`

```typescript
export const metadata: Metadata = {
  title: 'ASTA | Consumibles Premium para Impresoras',
  description: 'Descubre ASTA, la marca número 1 en consumibles para impresoras. Tóneres, tintas y cartuchos de calidad premium con máximo rendimiento.',
}
```

**Cambiar a:**
```typescript
export const metadata: Metadata = {
  title: 'Tu Empresa | Tu Descripción',
  description: 'Tu descripción SEO aquí...',
}
```

### Footer

**Archivo**: `app/page.tsx` (líneas 350-385)

Editar información:
```typescript
<div>
  <h3 className="font-bold text-lg mb-4 text-[#44abff]">ASTA</h3>
  <p className="text-gray-400">Soluciones premium en consumibles para impresoras.</p>
</div>
```

## 📰 Actualizar Contenido Dinámico

### Testimonios

**Archivo**: `components/Testimonials.tsx`

```typescript
const TESTIMONIALS = [
  {
    name: 'Carlos García',
    role: 'Gerente de Ventas',
    text: 'Testimonio aquí...',
    avatar: '👨‍💼',
  },
  // ... más testimonios
];
```

### Preguntas Frecuentes

**Archivo**: `components/FAQ.tsx`

```typescript
const FAQS = [
  {
    question: '¿Pregunta aquí?',
    answer: 'Respuesta aquí...',
  },
  // ... más preguntas
];
```

### Noticias

**Archivo**: `components/NewsSection.tsx`

```typescript
const NEWS = [
  {
    id: 1,
    title: 'Título de noticia',
    excerpt: 'Resumen aquí...',
    date: 'Mes Año',
    image: '📄',
    category: 'Categoría',
  },
  // ... más noticias
];
```

## 🔤 Tipografía

### Cambiar Fuentes

**Archivo**: `app/layout.tsx`

```typescript
import { Geist, Geist_Mono } from 'next/font/google'

// Cambiar a otras fuentes:
import { Inter, Roboto, Poppins } from 'next/font/google'

const _poppins = Poppins({ subsets: ["latin"], weight: ["400", "700", "900"] });
```

Luego en Tailwind config:
```typescript
theme: {
  fontFamily: {
    sans: ['var(--font-poppins)'],
  }
}
```

## 📱 Responsive Design

Para editar breakpoints o estilos responsivos:

```typescript
// Editar en componentes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* mobile: 1 columna, tablet: 2, desktop: 3 */}
</div>
```

## 🎬 Animaciones

### Cambiar Duración de Animaciones

**Archivo**: Cualquier componente

```typescript
// Antes - 0.8 segundos
transition={{ duration: 0.8 }}

// Después - más rápido (0.3) o más lento (1.5)
transition={{ duration: 0.3 }}
```

### Desactivar Animaciones

En `globals.css` o `layout.tsx`:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 🔗 Enlaces Externos

### Actualizar URLs de Links

**Navbar** (`components/Navbar.tsx`):
```typescript
const navItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Productos', href: '/productos' },
  { label: 'Contacto', href: '/contacto' },
];
```

**Footer** (`app/page.tsx`):
```typescript
<li><a href="/productos" className="hover:text-[#44abff] transition">Tóneres</a></li>
```

## 🎯 Botones y CTAs

### Personalizar Textos de Botones

**Hero Buttons** (línea ~105):
```typescript
<motion.button className="...">
  Explorar Productos
</motion.button>

<motion.button className="...">
  Conoce ASTA
</motion.button>
```

**CTA Final** (línea ~315):
```typescript
<motion.button className="...">
  Contáctanos
</motion.button>
```

## 📊 Datos Estadísticos

**Archivo**: `app/page.tsx` (líneas ~230-240)

```typescript
{
  value: '200+',
  label: 'Productos'
},
{
  value: '#1',
  label: 'En Venezuela'
},
```

## 🚀 Optimizaciones Recomendadas

1. **Comprimir imágenes**: Usar tools como TinyPNG
2. **Usar WebP**: Para mejor performance
3. **Lazy loading**: Aplicado automáticamente por Next.js
4. **Minify CSS/JS**: Automático en producción

## 📞 Recursos Útiles

- **Emojis**: [emojipedia.org](https://emojipedia.org)
- **Colores**: [colordot.it](https://color.hailpixel.com)
- **Fuentes**: [fonts.google.com](https://fonts.google.com)
- **Iconos**: [iconmonstr.com](https://iconmonstr.com)

## ✅ Checklist de Personalización

- [ ] Cambiar título y descripción
- [ ] Actualizar logo
- [ ] Cambiar colores de marca
- [ ] Editar productos
- [ ] Actualizar testimonios
- [ ] Editar FAQs
- [ ] Cambiar noticias
- [ ] Actualizar footer
- [ ] Verificar links
- [ ] Probar responsive design
- [ ] Verificar en mobile, tablet y desktop
