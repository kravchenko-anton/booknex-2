FROM node:18 AS backend
WORKDIR /app
COPY package*.json ./
COPY package*-lock.json ./
RUN apt-get update && apt-get install curl gnupg -y \
  && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install google-chrome-stable -y --no-install-recommends \
  && rm -rf /var/lib/apt/lists/* \
RUN npm config get proxy
RUN npm config rm proxy
RUN npm config rm https-proxy
RUN npm install -g husky
RUN npm install -g nx
RUN npm install --only=prod --force

COPY . .

RUN npx nx build backend --prod

FROM node:18
WORKDIR /app
COPY --from=backend /app/dist/apps/backend /app

CMD ["node", "app/main.js"]
