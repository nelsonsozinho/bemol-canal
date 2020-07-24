#Build application 
FROM node:13.13 as node
WORKDIR /app    
COPY package.json /app/
RUN npm i npm@latest -g
RUN npm install
COPY ./ /app/
ARG env=prod
RUN npm run build

#Run application 
FROM nginx:1.15
COPY ./dist/retail /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
