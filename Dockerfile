FROM node

RUN npm i npm@latest -g
RUN npm i -g sails
RUN npm i -g nodemon
RUN mkdir /app
WORKDIR /app
ADD backend/ /app

EXPOSE 1337
WORKDIR /app/backend
CMD ["nodemon", "app.js"]
