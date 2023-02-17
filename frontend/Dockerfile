FROM node as builder

COPY . /app
WORKDIR /app

RUN npm ci \
    && npm run build


FROM builder as dev

EXPOSE 3000
CMD ["serve", "."]


FROM nginx:stable-alpine as runner

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf