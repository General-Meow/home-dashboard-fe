FROM node:lts-alpine AS build-step
MAINTAINER Paul Hoang

WORKDIR /app
COPY . /app
RUN npm install && npm run build

FROM nginx:latest AS final-image
COPY --from=build-step /app/build /usr/share/nginx/html
COPY infra/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
