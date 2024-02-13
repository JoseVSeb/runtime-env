FROM node:20-alpine as base
RUN npm i -g pnpm

FROM base as builder
WORKDIR /workspace
COPY package.json pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile
RUN mkdir ./public
COPY public/* ./public
RUN mkdir ./src
COPY src/* ./src
COPY tsconfig.json .
RUN pnpm build

FROM base as runner
WORKDIR /app
RUN npm i -g serve runtime-env-cli
COPY --from=builder /workspace/build .
COPY scripts/start_server.sh .
RUN chmod +x start_server.sh
ENTRYPOINT [ "./start_server.sh" ]