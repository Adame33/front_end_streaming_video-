# ---------- Base con dependencias del sistema ----------
FROM node:20-alpine AS base
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

# ---------- Stage deps: instala dependencias con caché eficiente ----------
FROM base AS deps
# Si usas npm:
COPY package.json package-lock.json* ./
RUN npm ci

# (Si usas yarn: COPY package.json yarn.lock ./ && yarn --frozen-lockfile)
# (Si usas pnpm: RUN corepack enable && COPY package.json pnpm-lock.yaml ./ && pnpm i --frozen-lockfile)

# ---------- Stage builder: compila Next a standalone ----------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Compila para prod
RUN npm run build

# ---------- Stage runner: imagen final mínima ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    NEXT_TELEMETRY_DISABLED=1

# Crea usuario no root por seguridad
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Copia el bundle standalone y los assets estáticos
# .next/standalone contiene el servidor Node + node_modules que Next rastreó
COPY --from=builder /app/.next/standalone ./ 
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# (Opcional) Salud del contenedor
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD wget -qO- http://localhost:${PORT}/ || exit 1

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
