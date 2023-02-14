FROM node as builder

RUN apt-get update \
    && npm init -y \
    && npm install --save-dev \
        @babel/core \
        @babel/cli \
        @babel/preset-react 

COPY . /app
WORKDIR /app

RUN ./node_modules/@babel/clin/bin/babel.js js/script.jsx -o js/script.js


FROM builder as dev

RUN npm ci

EXPOSE 3000
CMD ["serve", "."]


FROM nginx:stable-alpine as runner

COPY --from=builder /app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf