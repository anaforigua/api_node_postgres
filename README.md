# api_node_postgres base de datos codigo

postgres=# CREATE DATABASE api_usuarios;
CREATE DATABASE
postgres=# USE api_usuarios;
ERROR:  error de sintaxis en o cerca de «USE»
LÍNEA 1: USE api_usuarios;
         ^
postgres=# \c api_usuarios
Ahora está conectado a la base de datos «api_usuarios» con el usuario «postgres».
api_usuarios=# REATE TABLE usuarios (
api_usuarios(#  id INT AUTO_INCREMENT PRIMARY KEY,
api_usuarios(#  nombre VARCHAR(100) NOT NULL,
api_usuarios(#  correo VARCHAR(150) UNIQUE NOT NULL,
api_usuarios(#  password VARCHAR(255) NOT NULL,
api_usuarios(#  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
api_usuarios(# );
ERROR:  error de sintaxis en o cerca de «REATE»
LÍNEA 1: REATE TABLE usuarios (
         ^
api_usuarios=# cREATE TABLE usuarios (
api_usuarios(#  id INT AUTO_INCREMENT PRIMARY KEY,
api_usuarios(#  nombre VARCHAR(100) NOT NULL,
api_usuarios(#  correo VARCHAR(150) UNIQUE NOT NULL,
api_usuarios(#  password VARCHAR(255) NOT NULL,
api_usuarios(#  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
api_usuarios(# );
ERROR:  error de sintaxis en o cerca de «AUTO_INCREMENT»
LÍNEA 2:  id INT AUTO_INCREMENT PRIMARY KEY,
                 ^
api_usuarios=# CREATE TABLE usuarios (
api_usuarios(#     id SERIAL PRIMARY KEY,
api_usuarios(#     nombre VARCHAR(100) NOT NULL,
api_usuarios(#     correo VARCHAR(150) UNIQUE NOT NULL,
api_usuarios(#     password VARCHAR(255) NOT NULL,
api_usuarios(#     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
api_usuarios(# );
CREATE TABLE
api_usuarios=# \dt
         Listado de relaciones
 Esquema |  Nombre  | Tipo  |  Due±o
---------+----------+-------+----------
 public  | usuarios | tabla | postgres
(1 fila)


api_usuarios=# \l
                                            Listado de base de datos
    Nombre    |  Due±o   | Codificaci¾n |        Collate        |         Ctype         |      Privilegios
--------------+----------+--------------+-----------------------+-----------------------+-----------------------
 api_usuarios | postgres | WIN1252      | Spanish_Colombia.1252 | Spanish_Colombia.1252 |
 postgres     | postgres | WIN1252      | Spanish_Colombia.1252 | Spanish_Colombia.1252 |
 template0    | postgres | WIN1252      | Spanish_Colombia.1252 | Spanish_Colombia.1252 | =c/postgres          +
              |          |              |                       |                       | postgres=CTc/postgres
 template1    | postgres | WIN1252      | Spanish_Colombia.1252 | Spanish_Colombia.1252 | =c/postgres          +
              |          |              |                       |                       | postgres=CTc/postgres
(4 filas)
