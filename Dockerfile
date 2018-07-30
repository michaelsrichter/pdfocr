FROM node:carbon
RUN apt-get update
RUN apt-get install -y graphicsmagick
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENTRYPOINT ["node", "index.js"]