# ⚡ Guía Rápida - ASTA Web

## 🚀 Inicio Rápido en 5 Minutos

### 1️⃣ Instalación y Desarrollo

```bash
# Clonar o descargar el proyecto
cd v0-project

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Abrir en navegador
# http://localhost:3000
```

### 2️⃣ Cambiar Información Básica

**Cambiar título y descripción** - `app/layout.tsx`:
```typescript
title: 'Tu Empresa | Consumibles Premium para Impresoras',
description: 'Tu descripción aquí...',
```

**Cambiar Logo** - `app/page.tsx` (línea ~85):
```typescript
<motion.img src="/tu-logo.png" alt="Logo" />
```

**Cambiar Colores** - Cualquier componente:
```typescript
// Reemplazar:
#44abff → tu-color-claro
#0b63cd → tu-color-oscuro
#f3f5f4 → tu-color-fondo
```

### 3️⃣ Actualizar Productos

**`app/page.tsx`** - Líneas 29-40:
```typescript
const PRODUCTS = [
  { 
    name: 'Tu Producto 1', 
    code: 'COD-001', 
    category: 'Tóneres', 
    icon: '🖨️' 
  },
  { 
    name: 'Tu Producto 2', 
    code: 'COD-002', 
    category: 'Tintas', 
    icon: '🖌️' 
  },
  // Agregar más...
];
```

### 4️⃣ Desplegar en Vercel

```bash
# Opción 1: CLI
npm install -g vercel
vercel

# Opción 2: Web
# Ir a vercel.com → New Project → Conectar GitHub
```

---

## 📝 Archivos Clave para Personalizar

| Archivo | Qué Cambiar |
|---------|-----------|
| `app/layout.tsx` | Título, descripción, favicon |
| `app/page.tsx` | Productos, textos, colores |
| `components/Testimonials.tsx` | Testimonios de clientes |
| `components/FAQ.tsx` | Preguntas frecuentes |
| `components/NewsSection.tsx` | Noticias/blog |
| `public/asta-logo.svg` | Logo de la marca |

---

## 🎨 Cambios de Diseño Comunes

### Cambiar Color Primario
```bash
# En terminal (reemplazar global)
sed -i 's/#0b63cd/#tu-color/g' app/page.tsx components/*.tsx
```

### Cambiar Fuente
**`app/layout.tsx`**:
```typescript
import { Poppins } from 'next/font/google'
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700", "900"] });
```

### Cambiar Mascota
**`app/page.tsx`** (línea ~270):
```typescript
<motion.img src="https://tu-servidor.com/tu-mascota.png" />
```

---

## 📊 Cambios Comunes

### Agregar Más Productos
En `app/page.tsx`, agregar al array `PRODUCTS`:
```typescript
const PRODUCTS = [
  // ... productos existentes
  {
    name: 'Nuevo Producto',
    code: 'COD-NEW',
    category: 'Tóneres',
    icon: '🖨️'
  }
];
```

### Cambiar Texto del Hero
**`app/page.tsx`** (líneas 80-90):
```typescript
<h1>Tu Título Aquí</h1>
<p>Tu descripción aquí</p>
```

### Agregar Link de Contacto
**En cualquier botón**:
```typescript
<motion.button onClick={() => window.location.href = 'mailto:contacto@tuempresa.com'}>
  Contactar
</motion.button>
```

---

## ✅ Pre-Lanzamiento Checklist

```
[ ] Cambiar título y descripción
[ ] Actualizar logo
[ ] Cambiar colores de marca
[ ] Editar todos los textos
[ ] Agregar productos reales
[ ] Actualizar testimonios
[ ] Cambiar FAQs
[ ] Verificar en móvil
[ ] Verificar en tablet
[ ] Verificar en desktop
[ ] Desplegar en Vercel
[ ] Configurar dominio personalizado
[ ] Agregar Google Analytics (opcional)
```

---

## 🐛 Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| "Module not found" | Ejecutar `pnpm install` |
| Puerto 3000 ocupado | `lsof -ti :3000 \| xargs kill -9` |
| Estilos no aplican | Limpiar `.next`: `rm -rf .next` |
| Imágenes no cargan | Verificar URLs en componentes |
| Animaciones lentas | Reducir elementos en FloatingElements |

---

## 📱 Comandos Útiles

```bash
# Desarrollo
pnpm dev

# Build para producción
pnpm build

# Iniciar servidor producción
pnpm start

# Linting (si está configurado)
pnpm lint

# Format de código (si está configurado)
pnpm format
```

---

## 🔗 Links Útiles

- 📖 [Documentación Completa](./README.md)
- 🎨 [Guía de Personalización](./CUSTOMIZATION.md)
- 🚀 [Guía de Despliegue](./DEPLOYMENT.md)
- 📊 [Resumen del Proyecto](./PROJECT_SUMMARY.md)

---

## 💡 Tips Pro

1. **Cambios en vivo**: El servidor recarга automáticamente al guardar
2. **DevTools**: Usa F12 para ver responsive design
3. **Color Picker**: Extensión Chrome para encontrar códigos de color
4. **Screenshots**: Usa Lighthouse en DevTools para auditoría

---

## 🚀 ¡Listo!

Tu página está 100% funcional. Solo personaliza el contenido y ¡lanzala!

**Soporte**: Consulta README.md, CUSTOMIZATION.md o DEPLOYMENT.md

**Happy coding! 🎉**
