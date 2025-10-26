#STAGE 01 : Build the VITE app
FROM node:20-alpine AS build

#working dir
WORKDIR /app

#copy package files and install dependencies
COPY package*.json ./
RUN npm install

#copy rest of the source code
COPY . .

#build the VITE app
RUN npm run build


#STAGE 02: serve the built files with Nginx + custom config
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

#expose port 80 for web traffic
EXPOSE 80

#start nginx server
CMD ["nginx", "-g" , "daemon off;"]