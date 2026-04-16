# ============================================================================
# Assessment System — Next.js Frontend
# Multi-stage Dockerfile: dev (default) and production targets
# ============================================================================

# ---------------------------------------------------------------------------
# Stage 1: Base Node image
# ---------------------------------------------------------------------------
FROM node:18-alpine AS base

WORKDIR /app

# ---------------------------------------------------------------------------
# Stage 2: Dependencies installer
# ---------------------------------------------------------------------------
FROM base AS deps

COPY package.json package-lock.json* ./
RUN npm ci

# ---------------------------------------------------------------------------
# Stage 3: Development target (default)
# ---------------------------------------------------------------------------
FROM base AS dev

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED=1

CMD ["npm", "run", "dev"]

# ---------------------------------------------------------------------------
# Stage 4: Production builder
# ---------------------------------------------------------------------------
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG BASE_URL
ENV BASE_URL=${BASE_URL}

RUN npm run build

# ---------------------------------------------------------------------------
# Stage 5: Production runner
# ---------------------------------------------------------------------------
FROM base AS production

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
