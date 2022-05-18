FROM node:16.15.0-alpine

RUN apk update && apk upgrade && apk add --update bash

WORKDIR /express-app

COPY ./package.json ./yarn.lock ./

RUN yarn install --modules-folder /node_modules

COPY ./ ./
