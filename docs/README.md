THE BIZ NATION TEST 2

Tecnologias utilizadas
node.js 18
Express.js
Sequelize 6
MySQL
Docker

INSTRUCCIONES

-Esta aplicacion utiliza el patron de diseño MVC (Modelo - Vista - Controlador)

Modelo(Model): 
-Representa la estructura de datos y la lógica de negocio (Service).
-En el contexto de Sequelize y MySQL, los modelos representan tablas en la base de datos.
-Sequelize es un ORM (Object-Relational Mapping) que permite interactuar con la base de datos usando objetos y métodos en lugar de escribir consultas SQL directas.

Vista(View):
-Presenta los datos al usuario en un formato legible.
En aplicaciones Express, las vistas suelen gestionarse con motores de plantillas como Pug, -Handlebars o EJS.
-En este caso se haran las pruebas por postman

Controlador(Controller):
-Actúa como un intermediario entre el Modelo y la Vista.
-Maneja las solicitudes del cliente, interactúa con el Modelo para obtener o modificar datos, y luego envía esos datos a la Vista para su presentación.

Flujo del Patrón MVC en Express.js con Sequelize y MySQL:

-El cliente envía una solicitud (por ejemplo, una solicitud GET a /users).
-El enrutador de Express dirige la solicitud al controlador adecuado.
-El controlador interactúa con el modelo (que se comunica con la base de datos MySQL a -través de Sequelize) para obtener o modificar datos.
-El controlador pasa los datos obtenidos del modelo a la vista.
-La vista utiliza los datos para generar una respuesta legible para el usuario y la envía al cliente (En este caso postman devuelve un response)
-Esta estructura separada y modular hace que el código sea más mantenible, escalable y reutilizable.

Para instalar node_modules debemos escribir este comando: npm install

Para instalar dependencias escribimos los siguientes comandos:
npm install express
npm install nodemon
npm install --save sequelize
npx sequelize-cli init     
npm install mysql2
npm install swagger-jsdoc swagger-ui-express   
npm install jsonwebtoken bcryptjs express-validator

para crear lo seeders:
personaje:
npx sequelize-cli seed:generate --name personajes

pelicula:
npx sequelize-cli seed:generate --name peliculas

genero:
npx sequelize-cli seed:generate --name genero

user:
npx sequelize-cli seed:generate --name user

para correr seeders:
npx sequelize-cli db:seed:all  

para quitar seeder:
npx sequelize-cli db:seed:undo

para crear migraciones:
personaje:
npx sequelize-cli migration:generate --name migration-personaje

pelicula:
npx sequelize-cli migration:generate --name migration-pelicula

genero:
npx sequelize-cli migration:generate --name migration-genero

user:
npx sequelize-cli migration:generate --name migration-user

para correr migrations:
npx sequelize-cli db:migrate

para quitar migration:
npx sequelize-cli db:migrate:undo

Para ejecutar el proyecto debemos escribir este comando: npm start

Documentacion con Swagger:
http://localhost:3009/api/v1/docs

Estos datos son datos locales de conexion a la base de datos
"username": "root",
"password": "123456789",
"database": "database_development",

instalar extension de docker pata visual studio code

Descarga el archivo:
curl -O https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh

Dale permisos de ejecucion
chmod +x wait-for-it.sh

construir imagen docker
docker-compose build

correr docker
docker-compose up

PD: debe tener docker instalado.