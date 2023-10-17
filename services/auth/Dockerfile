FROM node:alpine


ENV PORT=
ENV AUTH_DB=
ENV USERS_REMOTE_URL=
ENV MONGO_CONNECTION=
ENV JWT_KEY=

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
