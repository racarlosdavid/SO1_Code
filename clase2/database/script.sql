DROP DATABASE IF EXISTS so1;
CREATE DATABASE IF NOT EXISTS so1;
USE so1;

CREATE TABLE saludo (
    id int NOT NULL AUTO_INCREMENT,
    texto varchar(255),
    PRIMARY KEY (id)
);

INSERT INTO saludo (texto) VALUES ('Hola mundo');
INSERT INTO saludo (texto) VALUES ('Que pasa');
INSERT INTO saludo (texto) VALUES ('Hello world');