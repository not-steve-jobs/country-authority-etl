FROM node:22.2-alpine as base

FROM base AS builder

ARG VERSION

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY nest-cli.json .swcrc tsconfig.build.json tsconfig.json ./
COPY ./src ./src
COPY ./config ./config

RUN test -n "$VERSION" || (echo "VERSION is not set" && false)

RUN npm version $VERSION --git-tag-version false

RUN npm run build

# remove dev dependencies, we don't need them for a production environment
RUN npm prune -omit=dev

FROM base

ARG VERSION

WORKDIR /app

COPY --from=builder ./app/dist ./dist
COPY --from=builder ./app/node_modules ./node_modules
COPY --from=builder ./app/package.json ./package.json
COPY --from=builder ./app/config ./config

ENV VERSION=${VERSION} \
    NODE_ENV=production

RUN chown -R node:node /app

USER node

RUN if [ ! -f "dist/src/main.js" ]; then echo "Error: File 'dist/src/main.js' not found."; exit 1; fi

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
