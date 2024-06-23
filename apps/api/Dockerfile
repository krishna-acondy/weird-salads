FROM node:18-alpine AS base

FROM base AS builder
RUN apk update
WORKDIR /app
RUN yarn global add turbo
COPY . .

# Copy entrypoint script
COPY /apps/api/entrypoint.sh /app/apps/api/entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /app/apps/api/entrypoint.sh

RUN turbo prune api --docker

FROM base AS installer
RUN apk update
WORKDIR /app

# Install deps
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

# Build
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN yarn turbo build --filter=api...

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs
COPY --from=installer /app .

ENTRYPOINT ["/app/apps/api/entrypoint.sh"]