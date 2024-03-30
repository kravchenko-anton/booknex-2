# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to en sure both package.json AND package-lock.json are copied
COPY package*.json ./ yarn.lock ./

# Install app dependencies
RUN yarn install --production

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]