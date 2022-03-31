FROM node:17

EXPOSE 8080

WORKDIR /backend-app

COPY package*.json ./

RUN npm install

COPY src src

CMD npm run start