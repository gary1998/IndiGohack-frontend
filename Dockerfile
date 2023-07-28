FROM registry.access.redhat.com/ubi8/nodejs-16:1-111.1689167503

USER root
RUN yum update -y && yum upgrade -y

WORKDIR /opt/app-root/src

ARG PORT=3000
ENV PORT $PORT
ENV NODE_ENV production

COPY package.json /opt/app-root/src
RUN npm install
COPY . /opt/app-root/src

RUN rm -rf js/config.json
RUN echo "{\"BACKEND_URL\": \"$BACKEND_URL\"}" >> /opt/app-root/src/js/config.json

EXPOSE ${PORT}
CMD [ "npm", "start" ]