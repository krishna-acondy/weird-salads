FROM node:18-alpine AS base

FROM base AS builder
RUN apk update

WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune web --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install deps
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

# Build
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN yarn turbo build --filter=web...

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 app
USER app

FROM nginx:alpine
WORKDIR /usr/share/nginx/

RUN rm -rf html
RUN mkdir html

WORKDIR /

COPY --from=builder /app/apps/web/nginx.conf /etc/nginx
COPY --from=builder /app/apps/web/dist/ /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]