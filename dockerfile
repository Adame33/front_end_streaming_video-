# ---------- Build ----------
FROM node:22-alpine AS builder
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci
COPY . .
# Build standalone
RUN npm run build

# ---------- Runtime ----------
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# App Service usará este puerto si no pones WEBSITES_PORT
ENV PORT=8080
EXPOSE 8080

# Copiamos artefactos standalone + estáticos + public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Puente por si cambia el working dir al arrancar
# (la build standalone ya trae sus node_modules necesarios)
RUN printf "require('./server.js');\n" > /app/_entry.js

# CMD final
CMD ["node", "_entry.js"]
