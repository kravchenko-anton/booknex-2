# Install dependencies only when needed
FROM docker.io/node:lts-alpine as deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
COPY dist/apps/backend/package*.json ./
COPY apps/backend/prisma ./prisma
RUN npm install --omit=dev
RUN npm install prisma --save-dev
RUN npm install --include=optional sharp
RUN npx prisma generate
# Production image, copy all the files and run nest
FROM docker.io/node:lts-alpine as runner
RUN apk add --no-cache dumb-init
ENV NODE_ENV production
ENV PORT 3000
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/package.json ./package.json
COPY dist/apps/backend .
RUN chown -R node:node .
USER node
EXPOSE 3000
CMD ["dumb-init", "node", "main.js"]