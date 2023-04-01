# Build stage

FROM node:19-alpine AS build

WORKDIR /app

COPY . /app

RUN npm ci \
    && npm run build



# Dev stage

FROM node:19-alpine AS dev

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]



# Run stage

FROM nginx:stable-alpine AS prod

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf