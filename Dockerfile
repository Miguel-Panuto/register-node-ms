FROM node:lts-alpine

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npx prisma generate
RUN npm run build

CMD ["npm", "start"]

