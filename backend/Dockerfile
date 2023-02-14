FROM node

RUN apt-get update \
    && npm init -y \
    && npm i -g @nestjs/cli

WORKDIR /app
COPY . /app

EXPOSE 5000

CMD ["npm", "run", "start"]