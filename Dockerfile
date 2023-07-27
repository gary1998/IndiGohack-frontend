#!/bin/bash

FROM node:18

ARG PORT=3000
ENV PORT $PORT

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE ${PORT}

CMD [ "npm", "start" ]