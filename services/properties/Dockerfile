FROM node:alpine

ENV PORT=
ENV RESERVATION_URL=
ENV PROPERTIES_DB=
ENV MONGO_CONNECTION=
ENV JWT_KEY=

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "index.js"]
