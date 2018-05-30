#LATEST NODE Version -which node version u will use.
FROM node:9.2.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
#install dependencies
COPY package.json /usr/src/app
RUN npm install
#bundle app src
COPY . /usr/src/app
EXPOSE 3000
CMD [ "npm" , "start" ]
