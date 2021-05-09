FROM node:14-alpine AS build
WORKDIR /app
COPY package.json ./
RUN yarn install

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

COPY . .
RUN yarn build


FROM nginx:1.17.1-alpine
COPY --from=build /app/build/ /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
