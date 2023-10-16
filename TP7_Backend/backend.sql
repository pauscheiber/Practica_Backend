CREATE TABLE persona (
dni INT NOT NULL,
nombre VARCHAR(30) NOT NULL,
apellido VARCHAR(30) NOT NULL,
PRIMARY KEY (dni)
);

CREATE TABLE usuario (
mail VARCHAR(40) NOT NULL,
nickname VARCHAR(20) NOT NULL,
password VARCHAR(20) NOT NULL,
persona INT NOT NULL,
PRIMARY KEY (mail),
FOREIGN KEY (persona) REFERENCES persona(dni) 
);

