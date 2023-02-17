FROM node as builder

COPY . /app
WORKDIR /app

RUN npm ci \
    && npm run build


FROM node as dev

COPY . /app
WORKDIR /app

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]


FROM nginx:stable-alpine as runner

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf