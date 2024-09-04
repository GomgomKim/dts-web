FROM node:20-alpine AS base

# production image 생성
FROM base AS runner
WORKDIR /app

COPY public ./public
COPY --chown=nextjs:nodejs .next/standalone ./
COPY --chown=nextjs:nodejs .next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]