# Backend usando diferentes tecnologías
Este es un proyecto de backend, en el cual se usa el entorno nodejs junto al framework express para la creación del servidor el cual tiene como propósito ver, crear, modificar y borrar enlaces favoritos en donde cada una de estas funciones están protegidas por medio del middleware de autenticación passport usando JSON Web Tokens.
El gestor de base de datos usado es mysql, en el cual se tiene una base de datos con dos tablas, tanto para el almacenamiento de usuarios y enlaces.

Además, para la correcta implementación del entorno de producción se usa Docker, creando una imagen del servidor por medio del archivo Dockerfile y luego enlazando esta con la imagen de mysql por medio de una red de trabajo creada por docker-compose.

## Ejecutar el proyecto
Para ejecutar el proyecto primero se debe crear la imagen del servidor por medio del siguiente comando:
- docker build -t <nombre_imagen> .

Donde <nombre_imagen> es el nombre de la imagen del servidor que se quiera colocar.
Posteriormente se deben ejecutar los dos siguientes comandos:
- docker-compose build
- docker-compose up
