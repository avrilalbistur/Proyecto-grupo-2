# Proyecto-grupo-2
Pasos para ejecutar el backend:
1. Clonar el proyecto en tu computadora.
2. Descargar Node.js en nodejs.org. y MariaDB en mariadb.org
5.Configurar la base de datos en MariaDB
3. Conéctate a tu servidor MariaDB: mysql -u root -p
4. Crea la base de datos y tablas: CREATE DATABASE users_db;
 USE users_db;
 CREATE TABLE login ( id INT AUTO_INCREMENT PRIMARY KEY, 
email VARCHAR(255) NOT NULL UNIQUE, 
password VARCHAR(255) NOT NULL );
5. En la barra de herramientas de Visual darle click a “view” y elegir “terminal”
6. Debo ejecutar "npm install express body-parser bcryptjs jsonwebtoken mariadb dotenv" (esto descargará e instalará todos estos paquetes de una vez, pero puede realizarse uno por uno) , con esto aseguramos que todas estas dependencias se instalen y se puedan utilizar en mi proyecto, haciendo que el backend funcione correctamente y de manera segura.
7. Luego de descargar las dependencias definidas en el archivo package.json debemos rectificar que la contraseña para hacer la conexión a la base de datos sea la nuestra e iniciar el servidor (el cual encontramos en la sección de scripts “starts”: “node app.js). Escribimos en la terminal npm start, luego de escribir eso si esta todo bien nos devuelve:
SECRET_KEY: tu_clave_secreta
Servidor corriendo en http://localhost:3001
8. Con el servidor http://localhost:3001 lo que hacemos es ir a probar en Postman. Primero debemos crear una solicitud POST a http://localhost:3001/register y en body seleccionar raw y en text la opción JSON, para así escribir 
{
    "email": "email@ejemplo.com",  (puedes poner tu email o el que quieras)
    "password": "cualquier contraseña" (de 10 caracteres)
}
9. Luego del register procedemos al login, es básicamente lo mismo pero este nos devolvera un token. Debemos crear una solicitud POST a http://localhost:3001/login y dejar el body igual que en el paso anterior, esto nos devolvera un token
10. El ultimo paso en postman es crear una solicitud GET a http://localhost:3001/protected. Para esto debemos solamente cambiar el header. En key debemos poner Authorization y en Value ponemos Barrer y el token obtenido, esto nos devolvera un mensaje de acceso concedido.
Para corroborar lo que hicimos en postman nos dirigimos a nuestra base de datos, precisamente a nuestra tabla login y en datos podremos ver los usuarios y el token guardadaos

