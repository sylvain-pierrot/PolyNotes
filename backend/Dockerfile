## DEV
FROM node:19-alpine as dev

WORKDIR /app

COPY . .

RUN yarn install

CMD [ "yarn", "run", "start:dev" ]



## PROD
FROM node:19-alpine as prod 

WORKDIR /app

COPY . .

RUN yarn install && yarn run build

CMD [ "node", "dist/main"]


