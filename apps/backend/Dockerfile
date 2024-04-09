# Install dependencies only when needed
FROM docker.io/node:lts-alpine as deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./
COPY apps/backend apps/backend
COPY libs libs
RUN npm install --omit=dev
RUN npm install -g husky
RUN npm install nx
RUN npm install prisma --save-dev
RUN npm install --include=optional sharp
RUN npx prisma generate
RUN nx --version
RUN npx nx build backend

# Production image, copy all the files and run nest
FROM docker.io/node:lts-alpine as runner
RUN apk add --no-cache dumb-init
ENV NODE_ENV production
ENV PORT 3000
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/package.json ./package.json
COPY --from=deps /usr/src/app/dist/apps/backend .
RUN chown -R node:node .
USER node
EXPOSE 3000
CMD ["dumb-init", "node", "main.js"]
