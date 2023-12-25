FROM node:slim
MAINTAINER Paul Hoang

WORKDIR /app
COPY . /app
RUN npm install && npm run build

CMD ["npm", "run", "start"]