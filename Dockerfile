FROM node:20-alpine AS base

# 1단계: 환경 설정 및 dependancy 설치
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
RUN rm -rf ./.next/cache

# 2단계: next.js 빌드 단계
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG ENV_NODE
COPY .env.$ENV_NODE ./.env.production

RUN npm install -g pnpm && pnpm run build

# 3단계: production image 생성
FROM base AS runner
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]