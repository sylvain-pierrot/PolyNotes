FROM node:18-alpine as build

# create app directory
WORKDIR /app

# copy package.json first to leverage Docker cache
COPY . .

# install dependencies
RUN yarn install


FROM build as dev

CMD [ "yarn", "run", "start:dev" ]


FROM build as prod 

CMD [ "yarn", "run", "start:prod" ]
