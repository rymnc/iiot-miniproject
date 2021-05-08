FROM node:14-alpine

WORKDIR /app

COPY package.json .

RUN yarn install

COPY --chown=node:node . .

RUN yarn build:ts
RUN npx prisma generate

USER node

EXPOSE 5000
CMD [ "yarn", "start:prod" ]
