FROM node:alpine

ENV PORT=
ENV USERS_DB=
ENV MONGO_CONNECTION=
ENV JWT_KEY=

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3002

CMD ["node", "index.js"]
