FROM node:14-alpine

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build:ts

RUN chown -R node:node /app
USER node

CMD [ "yarn", "start:prod" ]
EXPOSE 3000