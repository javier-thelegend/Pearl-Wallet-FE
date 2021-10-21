#BUILD
#docker build -t pearl-wallet-fe:0.1.0 -f Dockerfile .

#RUN
#docker run -p 3000:3000 -d pearl-wallet-fe:0.1.0

#node --version
FROM node:14.17.6 

#Workdir
WORKDIR /app

#Copy all files where this file is located to /app
COPY . /app

#Firebase variables are moved in .env.local

#Install Node
RUN npm install

#Create build (compiled version)
RUN npm run build

#FROM nginx

#Port to use
EXPOSE 3000

#Run App
CMD [ "npm", "start"]