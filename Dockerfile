# setup stage
FROM node:20-alpine AS setup

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci && npm cache clean --force

# build stage

FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm run build

# deploy stage

FROM node:20-alpine AS deploy

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist .

EXPOSE 4000

CMD ["node", "dist/main.js"]
