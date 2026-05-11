# ASTA - Página Web Inmersiva en 3D

Una página web informativa premium para la marca ASTA, líder en consumibles para impresoras en Venezuela. Desarrollada con tecnologías modernas para proporcionar una experiencia inmersiva y atractiva.

## 🎨 Características Principales

### 1. **Diseño Responsive y Moderno**
- Interfaz completamente adaptable a dispositivos móviles, tablets y desktops
- Diseño con gradientes y colores de la marca ASTA
- Paleta de colores: Azul claro (#44abff), Azul oscuro (#0b63cd), Gris claro (#f3f5f4)

### 2. **Efectos Parallax Inmersivos**
- Scroll parallax dinámico que crea profundidad visual
- Elementos flotantes animados en el fondo
- Transiciones suaves entre secciones

### 3. **Componentes 3D con React Three Fiber**
- Mascota 3D animada (Panda ASTA)
- Iluminación realista con studio environment
- Interactividad basada en scroll

### 4. **Animaciones Fluidas**
- Animaciones con Framer Motion
- Efectos hover interactivos
- Transiciones suaves de elementos

### 5. **Secciones Completas**

#### Hero Section
- Presentación impactante con hero image 3D
- Botones de CTA animados
- Logo y propuesta de valor clara

#### Features
- 3 características principales de ASTA
- Cards animadas con iconos
- Diseño limpio y estructurado

#### Productos
- Grid de productos con 8 ejemplos principales
- Cards interactivas con hover effects
- Información de categoría y código de producto

#### How It Works
- Proceso de 4 pasos con números animados
- Línea conectora visual
- Íconos intuitivos

#### Noticias
- Últimas novedades de ASTA
- Categorización por tipo
- Diseño de blog card

#### Testimonios
- 3 testimonios de clientes
- Rating de 5 estrellas
- Avatars y roles

#### FAQ
- 6 preguntas frecuentes
- Accordion expandible
- Respuestas detalladas

#### Mascota Banner
- Presentación del panda mascota ASTA
- Descripción de valores
- Imagen interactiva con hover effects

#### CTA Final
- Sección de conversión final
- Botón destacado

#### Footer
- Información de empresa
- Links a secciones
- Social media

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **3D Graphics**: React Three Fiber + Three.js
- **Animaciones**: Framer Motion + GSAP
- **Lenguaje**: TypeScript
- **Icons**: Emojis y SVG customizado

## 📦 Dependencias Principales

```json
{
  "next": "^16.2.0",
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  "three": "^0.184.0",
  "@react-three/fiber": "^9.6.1",
  "@react-three/drei": "^10.7.7",
  "framer-motion": "^12.38.0",
  "gsap": "^3.15.0",
  "tailwindcss": "^3.x"
}
```

## 🚀 Comenzar

### Instalación

```bash
pnpm install
```

### Desarrollo

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build para Producción

```bash
pnpm build
pnpm start
```

## 📁 Estructura del Proyecto

```
app/
├── layout.tsx          # Layout raíz con metadatos
├── page.tsx           # Página principal con todas las secciones
└── globals.css        # Estilos globales

components/
├── PandaMascot.tsx    # Componente 3D del panda
├── MascotScene.tsx    # Canvas para el componente 3D
├── ProductCard.tsx    # Card individual de producto
├── ProductGallery.tsx # Galería de productos
├── Testimonials.tsx   # Sección de testimonios
├── FloatingElements.tsx # Elementos flotantes de fondo
├── HowItWorks.tsx     # Sección "Cómo funciona"
├── NewsSection.tsx    # Sección de noticias
└── FAQ.tsx           # Sección de preguntas frecuentes

public/
└── asta-logo.svg      # Logo de ASTA en SVG
```

## 🎯 Componentes Principales

### PandaMascot
Componente 3D que renderiza la mascota Panda de ASTA usando Three.js. Incluye:
- Geometría 3D con esferas y capsulas
- Materiales realistas
- Animaciones basadas en scroll

### ProductCard
Card interactivo para mostrar productos:
- Información del producto
- Hover effects animados
- Botón "Ver detalles"

### Testimonials
Sección de testimonios con:
- Valoraciones de 5 estrellas
- Información del autor
- Diseño profesional

### HowItWorks
Proceso de 4 pasos con:
- Números animados en círculos
- Línea conectora visual
- Descripciones claras

### FAQ
Accordion expandible con:
- Animación smooth de expand/collapse
- 6 preguntas frecuentes
- CTA para contacto

## 🎨 Personalización

### Colores
Los colores de ASTA están definidos como values de Tailwind:
- `#44abff` - Azul claro
- `#0b63cd` - Azul oscuro
- `#f3f5f4` - Gris claro

Para cambiar los colores, edita las clases de Tailwind en los componentes.

### Productos
Para actualizar los productos mostrados, edita el array `PRODUCTS` en `app/page.tsx`.

### Contenido
Todo el contenido puede ser editado directamente en los componentes.

## ✨ Características de UX/UI

- ✅ Diseño mobile-first
- ✅ Animaciones suaves y atractivas
- ✅ Componentes reutilizables
- ✅ Accesibilidad mejorada
- ✅ Performance optimizado
- ✅ SEO friendly

## 🚀 Despliegue

### Vercel (Recomendado)

```bash
vercel deploy
```

### Otras plataformas
La aplicación puede ser desplegada en cualquier plataforma compatible con Next.js:
- Netlify
- AWS
- Google Cloud
- Heroku

## 📝 Notas de Desarrollo

- La página está totalmente optimizada para dispositivos móviles
- El componente 3D solo se renderiza en cliente (ssr: false)
- Las animaciones están optimizadas para performance
- Las imágenes están optimizadas con Next.js Image

## 🔐 SEO & Meta Tags

- Título: "ASTA | Consumibles Premium para Impresoras"
- Descripción: Personalizada para SEO
- Viewport: Responsive
- Language: es (Español)

## 📞 Soporte

Para reportar bugs o sugerencias, contacta al equipo de desarrollo.

## 📄 Licencia

Todos los derechos reservados © 2024 ASTA
