# Pearl-Wallet-FE
Pearl Wallet Front End Code

# React JS
Libreria para Front End basada en JS

CRA : Create React APP
Comando : npx create-react-app project-name

Correr Proyecto:
	1. Moverse a la app
	2. npm run start
Web: http://localhost:3000

Adicional se pueden eliminar los archivos que no se van a usar del proyecto

Eliminar C:\>rd /S /Q C:\DatosBorrar

Instalar Extensiones: ES7 React/Redux/GraphQL/React-Native snippets y Pretty Formatter

Organizar el proyecto:
1. index.js en carpeta src
2. en src crear carpeta components y dentro de components tener una carpeta por cada componente
3. tener los containers en esa carpeta tambien

Snipet rafce para crear plantilla de codigo automaticamente

Bootstrap: 
	npm install react-bootstrap@next bootstrap@5.1.0
Iconos: 
	npm install react-bootstrap-icons --save
Redireccionar Paginas: 
	npm install react-router-dom
Formik:
	npm install formik --save
CharsJs:
	npm install --save react-chartjs-2 chart.js
Tablas:
	npm install react-table --save

(No es tan buena) Graficos: https://www.npmjs.com/package/react-charts
Graficos https://github.com/reactchartjs/react-chartjs-2

useEfect() es para sustituir ciclos de vida de un componente ahi se puede llamar API y ejecutar
acciones cuando se renderiza la pagina o cuando cambia un componente

Tablas en React : https://www.paradigmadigital.com/dev/agilizar-desarrollo-tablas-react/
				  https://github.com/adazzle/react-data-grid/blob/main/README.md
				  

https://sequelize.org/

https://developer.mozilla.org/en-US/docs/Glossary/Falsy


Node JS
	1. npm init
		Dar Yes a todo
	2. npm i --save express
	3. npm i --save-dev nodemon
	4. Configurar package.json
		"scripts": {
			"start": "node app.js",
			"dev": "nodemon app.js",
			"test": "echo \"Error: no test specified\" && exit 1"
		}
	5. npm start o npm run dev (para correr nodemon app.js)

Paquetes adicionales:
	- npm i --save cors
	- npm i --save dotenv
	- npm i @firebase/app-compat
	- npm i --save firebase-admin
	- npm i --save pg
	

Dockers
	1. Crear nuevo dockerfile (Instrucciones que le dicen como construir la imagen al docker)
	2. Ejemplo (Instrucciones)
		FROM ubuntu			//Usar de base Ubuntu, sin tag indica usar la latest sino puedo especificar una asi por ejemplo FROM ubuntu:20.04
	3. Build
		docker build -t <image-name> -f path/docker/file .	//Soporta cualquier cosa el nombre
	4. docker image ls		//Listar imagenes docker
	5. Otros comandos
		ENV name=value				//Setear variables de entorno
		LABEL name=value			//Tag para identificar quien hace la imagen	LABEL owner=test LABEL email=test@test.com
		COPY html/index.html /opt/index.html   //Copia archivos del host al containes COPY source target
		RUN ls									//Ejecutar cualquier comando dentro del contenedor es como abrir la consola
		USER	telus								//Indica con que usuario se van a ejecutar los comandos
		WORKDIR	/opt/html								//Donde esta mi codigo
		EXPOSE	80								//Puerto que va a correr
		
Useful commands
---------------
Build a container image

docker build -t <image_name>:<tag> -f <docker_file> .
Download an image from the Registry

docker pull <image_name>:<tag>
List all containers

docker ps -a
List all images

docker image ls
Start a container

docker run -d -p 8888:80 -e MY_VAR=HELLO <image_name>
Enter to a container

docker exec -it <cotainer_id> /bin/bash
Get container logs

docker logs -f <cotainer_id>
---------------

Examples
---------------
Database start

docker run -p 5432:5432 \
-e POSTGRES_PASSWORD=mysecretpassword \
# Database persistence
-v /home/cloud_user/code/data:/var/lib/postgresql/data \
# Database init scripts 
-v /home/cloud_user/code/init:/docker-entrypoint-initdb.d -d postgres:9

Start Backend

docker run -p 8000:3800 \
-e POSTGRE_PASS=mysecretpassword \
-e POSTGRE_HOST=172.31.105.250 -d backend:0.1.0

Start Frontend

docker run -p 80:80 -d frontend:0.1.0
---------------
		
Ejemplo File my-nodejs-app
---------------------------------------
FROM node:7
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ONBUILD COPY package.json /usr/src/app/
ONBUILD RUN npm install
ONBUILD COPY . /usr/src/app
CMD [ "npm", "start" ]
---------------------------------------
See images: docker images -a
See container: docker ps -a
See logs: docker logs <container-id>
The command to build the image is: docker build -t my-nodejs-app .
The command to launch the built image is: docker run -d --name my-running-app -p 3000:3000 my-nodejs-app
For testing: curl http://docker:3000



Kubernetes
---------------------------------------
Antes que nada subir imagen a docker hub (https://hub.docker.com/repository/docker/ojcl/pearl-wallet):
	1. Crear Cuenta
	2. Crear imagen de BE o FE
	3. Crear tag -> docker tag pearl-wallet-be:0.1.0 ojcl/pearl-wallet:0.1.0
	3. Crear tag -> docker tag pearl-wallet-fe:0.1.0 ojcl/pearl-wallet:fe-0.1.0
	4. Subir la imagen -> docker push ojcl/pearl-wallet:0.1.0
	4. Subir la imagen -> docker push ojcl/pearl-wallet:fe-0.1.0

	Funciona por objetos:
	PODS = Container
	Deployment = Se compone de varios PODS y el los crea automaticamente con el yml
	Service = Abre la IP para poder acceder a los PODS y puede funcionar como balanceador de carga

Hay 2 Formas:
	Declarativa: A travez de comandos
	Imperativa: YML

Comandos:
	https://minikube.sigs.k8s.io/docs/start/
	minikube start  : Iniciar Minikube
	minikube dashboard  : Abre dashboard de minikube para ver objetos
	kubctl apply -f <file>.yml
	kubectl get pods
	kubectl describe pods/<pod_id>
	kubectl get services
	kubectl get deployments
	kubectl delete pod <pod_id>
	kubectl delete service <service_id>
	kubectl delete deployment <deployment_id>
	minikube service postgres
	minikube service pearl-wallet-be
	kubectl delete service pearl-wallet-fe
	kubectl delete deployment pearl-wallet-fe
	minikube service pearl-wallet-fe
	minikube stop --all
	
#Para probar si funciona ejectar
kubectl port-forward services/pearl-wallet 8888:5432 ; 8888 = puede ser cualquier puerto pero por comodidad se usa este
#y tratar de conectar en dbeaver con user: localhost en port: 8888 pass: admin
#ya connectado puedo hacer restore de mi base de datos
#no es necesario hacer el script
---------------------------------------
