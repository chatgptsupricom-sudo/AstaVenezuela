# ==========================================
# Etapa 1: Instalar dependencias
# ==========================================
FROM node:20-alpine AS deps
# libc6-compat es necesario en Alpine para algunas dependencias nativas
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiamos los archivos de dependencias
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Instalamos usando el gestor de paquetes adecuado según el archivo lock existente
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  else echo "No lockfile found." && npm install; \
  fi

# ==========================================
# Etapa 2: Construir la aplicación
# ==========================================
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Deshabilitar la telemetría de Next.js durante el build
ENV NEXT_TELEMETRY_DISABLED=1

RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else npm run build; \
  fi

# ==========================================
# Etapa 3: Entorno de Producción (Runner)
# ==========================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Por seguridad, creamos un usuario sin privilegios de root para ejecutar la app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiamos la carpeta public
COPY --from=builder /app/public ./public

# Copiamos la build y los node_modules
# Nota: Si activas "output: 'standalone'" en next.config.mjs, esta sección puede optimizarse aún más.
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Cambiamos al usuario no root
USER nextjs

EXPOSE 3000

# Iniciamos la aplicación
CMD ["npm", "start"]
