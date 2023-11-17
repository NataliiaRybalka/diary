FROM node:14 as base

WORKDIR /usr

COPY package*.json ./

RUN npm i

COPY . .


FROM base as production

ENV NODE_PATH=./build
EXPOSE 4000
CMD ["npm", "run", "build"]