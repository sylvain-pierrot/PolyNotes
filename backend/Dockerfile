FROM node:19-alpine as build

WORKDIR /app

COPY . .

RUN yarn install && yarn run build



## DEV
FROM node:19-alpine as dev

WORKDIR /app

COPY . .

RUN yarn install

CMD [ "yarn", "run", "start:dev" ]



## PROD
FROM node:19-alpine as prod 

COPY --from=build /app/dist /app

CMD [ "node", "app/main.js"]


