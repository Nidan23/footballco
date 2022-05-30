FROM node:18.1.0

RUN mkdir -p /usr/src/footballco

COPY src /usr/src/footballco/src
COPY nest-cli.json /usr/src/footballco
COPY package.json /usr/src/footballco
COPY tsconfig.json /usr/src/footballco
COPY tsconfig.build.json /usr/src/footballco
COPY .env /usr/src/footballco

WORKDIR /usr/src/footballco

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]