FROM node:14-alpine AS build
WORKDIR /app

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

COPY package.json .

RUN yarn install --production=false
COPY . .
RUN rm /app/node_modules/.bin/react-scripts
RUN ln -s /app/node_modules/react-scripts/bin/react-scripts.js /app/node_modules/.bin/react-scripts
RUN yarn build


FROM nginx:1.17.1-alpine
COPY --from=build /app/build/ /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
