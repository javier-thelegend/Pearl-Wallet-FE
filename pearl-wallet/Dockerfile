#BUILD
#docker build -t pearl-wallet-fe:0.1.0 -f Dockerfile .

#RUN
# docker run -p 80:80 -d pearl-wallet-fe:0.1.0

#node --version
FROM node:14.17.6 as compilacion

#Workdir
WORKDIR /app

#Copy all files where this file is located to /app
COPY . /app

#Firebase variables are moved in .env.local
ENV REACT_APP_FIREBASE_API_KEY=AIzaSyCcVRAXubcBkUwltBuf-kxwIIq2FdtyRm0
ENV REACT_APP_FIREBASE_AUTH_DOMAIN=pearl-wallet-project.firebaseapp.com
ENV REACT_APP_FIREBASE_PROJECT_ID=pearl-wallet-project
ENV REACT_APP_FIREBASE_APP_ID=1:335196229907:web:2084f0fc3053906aea0ae6

#Localhost
ENV REACT_APP_BACKEND_BASE_URL=http://localhost:3800

#GCP Host
#ENV REACT_APP_BACKEND_BASE_URL=http://35.202.68.193:3800

#Install Node
RUN npm install

#Create build (compiled version)
RUN npm run build

#Use nginx
FROM nginx:1.21.3

#Pass compilacion to nginx directory
COPY --from=compilacion /app/build /usr/share/nginx/html

#Port to use
#EXPOSE 3000

#Run App
#CMD [ "npm", "start"]