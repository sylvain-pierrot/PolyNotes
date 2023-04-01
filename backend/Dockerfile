## DEV
FROM node:19-alpine as dev

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 5000

CMD [ "yarn", "run", "start:dev" ]



## PROD
FROM node:19-alpine as prod 

WORKDIR /app

COPY . .

RUN yarn install & yarn run build

EXPOSE 5000

CMD [ "yarn", "run", "start:prod" ]