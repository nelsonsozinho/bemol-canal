FROM node:13-alpine

WORKDIR /usr/app

COPY package.json package-lock.json ./

COPY . . 

EXPOSE 3000

CMD ["npm", "start"]