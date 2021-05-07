FROM node:14-alpine

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build:ts

RUN chown -R node:node /app
USER node

EXPOSE 5000
CMD [ "yarn", "start:prod" ]
