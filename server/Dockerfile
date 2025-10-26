#user Node.js base image
FROM node:20-alpine

#set working directory
WORKDIR /app

#copy package files
COPY package*.json ./

#install dependencies
RUN npm install

#copy source code
COPY . .

#expose backend port
EXPOSE 3000

#run the app
CMD ["npm","start"]
