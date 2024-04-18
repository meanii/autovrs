FROM node:20-alpine

WORKDIR /app
COPY . /app/

RUN npm i -g pnpm
RUN pnpm install

EXPOSE 4000
CMD [ "pnpm", "run", "start" ]