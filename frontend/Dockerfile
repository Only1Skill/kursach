FROM node:16

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

COPY ./src ./src
COPY ./public ./public

EXPOSE 3000
CMD ["npm", "start"]
