# Guía de Despliegue - ASTA Web

## 🚀 Opciones de Despliegue

### Opción 1: Vercel (Recomendado)

Vercel es la mejor opción para desplegar aplicaciones Next.js con máximo rendimiento.

#### Pasos:

1. **Conectar repositorio Git** (si existe)
   ```bash
   git push origin main
   ```

2. **Desplegar con Vercel CLI**
   ```bash
   npm install -g vercel
   vercel
   ```

3. **O desplegar desde el navegador**
   - Ir a [vercel.com](https://vercel.com)
   - Hacer click en "New Project"
   - Seleccionar tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Next.js
   - Hacer click en "Deploy"

#### Beneficios:
- ✅ Zero-config deployment
- ✅ Automatic SSL certificates
- ✅ Global CDN
- ✅ Automatic previews en PRs
- ✅ Analytics y monitoring

### Opción 2: Netlify

1. **Desplegar desde el navegador**
   - Ir a [netlify.com](https://netlify.com)
   - Conectar tu repositorio
   - Configurar build command: `pnpm build`
   - Configurar publish directory: `.next`

2. **O usar Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

### Opción 3: AWS/Google Cloud/Heroku

Para otras plataformas:

1. **Build para producción**
   ```bash
   pnpm build
   ```

2. **Iniciar servidor**
   ```bash
   pnpm start
   ```

## 🔧 Personalización Pre-Despliegue

### 1. Actualizar Información de Empresa

**`app/layout.tsx`** - Actualizar metadatos:
```typescript
export const metadata: Metadata = {
  title: 'ASTA | Consumibles Premium para Impresoras',
  description: 'Tu descripción aquí...',
  // ... más configuración
}
```

### 2. Agregar/Modificar Productos

**`app/page.tsx`** - Editar array `PRODUCTS`:
```typescript
const PRODUCTS = [
  { 
    name: 'Tu Producto', 
    code: 'CODIGO', 
    category: 'Tóneres', 
    icon: '🖨️' 
  },
  // ... más productos
];
```

### 3. Cambiar Colores de Marca

Editar los colores en los componentes:
- `#44abff` → Azul claro
- `#0b63cd` → Azul oscuro
- `#f3f5f4` → Gris claro

O en Tailwind config (si existe):
```typescript
theme: {
  colors: {
    'asta-blue-light': '#44abff',
    'asta-blue-dark': '#0b63cd',
    'asta-gray': '#f3f5f4',
  }
}
```

### 4. Actualizar Imágenes

**Logo**
- Reemplazar imagen en `public/asta-logo.svg`
- Actualizar URL de imagen en componentes

**Mascota**
- Actualizar URL de imagen del panda en `app/page.tsx`
- La URL actual: https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ASTA%20MASCOTA-hveQftSuOf6A9CH7k6WgmcCgg9meGz.png

### 5. Actualizar Texto y Contenido

Los textos principales están en:
- **Secciones Hero**: `app/page.tsx` (línea 70-100)
- **Features**: `app/page.tsx` (línea 180-210)
- **Testimonios**: `components/Testimonials.tsx`
- **FAQs**: `components/FAQ.tsx`
- **Noticias**: `components/NewsSection.tsx`

### 6. Configurar Dominio Personalizado

#### En Vercel:
1. Ir a Project Settings → Domains
2. Agregar dominio personalizado
3. Actualizar DNS records en tu proveedor de dominio

#### En Netlify:
1. Site Settings → Domain Management
2. Add custom domain
3. Actualizar DNS records

## 📊 Optimizaciones Pre-Producción

### Performance

```bash
# Ejecutar Lighthouse audit
pnpm build
pnpm start
# Abrir DevTools en Chrome y correr Lighthouse
```

### SEO

Verificar en `app/layout.tsx`:
- ✅ Meta description
- ✅ Viewport configuration
- ✅ Open Graph tags (opcional)
- ✅ Twitter card tags (opcional)

### Mobile Testing

```bash
# Verificar responsive design
pnpm dev
# Abrir DevTools y probar en diferentes tamaños
```

## 🔒 Seguridad

### Antes de desplegar:

1. **Variables de entorno**
   - Crear `.env.local` con variables privadas
   - Agregar variables públicas en `.env.local`

2. **HTTPS**
   - Vercel/Netlify ofrecen HTTPS gratis automáticamente

3. **Rate limiting** (opcional)
   - Implementar si hay API endpoints

## 📈 Monitoreo Post-Despliegue

### Vercel
- Verificar Analytics en Dashboard
- Monitorear Edge Function performance
- Revisar Build logs en caso de errores

### Herramientas Recomendadas
- Google Analytics
- Sentry (error tracking)
- LogRocket (session replay)

## 🚨 Troubleshooting

### Error: "Module not found"
```bash
pnpm install
pnpm build
```

### Error: "Port already in use"
```bash
# Matar proceso en puerto 3000
lsof -ti :3000 | xargs kill -9
pnpm dev
```

### Imágenes no cargan
- Verificar URLs de imagen
- Asegurarse que URLs externas están permitidas
- Usar `next/image` para optimización

### Animaciones lentas en mobile
- Reducir cantidad de elementos flotantes
- Usar `will-change` CSS con moderación
- Probar en dispositivo real

## 🎯 Checklist Pre-Lanzamiento

- [ ] Actualizar todos los textos
- [ ] Cambiar logo y colores de marca
- [ ] Configurar dominio personalizado
- [ ] Probar en móvil, tablet y desktop
- [ ] Revisar Google Lighthouse scores
- [ ] Configurar Google Analytics
- [ ] Hacer test de velocidad
- [ ] Revisar SEO meta tags
- [ ] Probar formularios de contacto (si aplica)
- [ ] Hacer backup de código
- [ ] Revisar términos legales/privacidad (si aplica)

## 📞 Soporte

Para problemas con:
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Tailwind**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Framer Motion**: [framer.com/motion](https://www.framer.com/motion)
- **Three.js**: [threejs.org/docs](https://threejs.org/docs)
