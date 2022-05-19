FROM node:16.15.0-alpine

RUN apk update && apk upgrade && apk add --update bash

WORKDIR /cra-app

COPY ./package.json ./yarn.lock ./

ENV PATH="/node_modules/.bin:${PATH}"

RUN yarn install --modules-folder /node_modules

COPY ./ ./
