# Naively Simple Node Dockerfile

FROM node:latest

RUN mkdir -p /home/app/ && chown -R node:node /home/app
WORKDIR /home/app
RUN rm -rf /home/app/*
COPY --chown=node:node . .

USER node

RUN npm install --frozen-lockfile
RUN npm build

EXPOSE 3000
CMD [ "npm", "start" ]
