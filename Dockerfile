# syntax=docker/dockerfile:1

# Stage 1: Dependencies
FROM node:24-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# Stage 2: Runner
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Create non-root user for security
USER node

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=deps /app/node_modules ./node_modules
COPY --chown=node:node src/ ./src/

EXPOSE 3000

CMD ["node", "src/server.js"]
