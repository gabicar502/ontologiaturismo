-- Tabla de usuarios
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL  -- Hasheada idealmente
);

-- Tabla de roles (opcional, útil si tienes administrador, turista, operador, etc.)
CREATE TABLE roles (
    id_rol SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL
);

CREATE TABLE usuario_rol (
    id_usuario INT,
    id_rol INT,
    CONSTRAINT pk_usuario_rol PRIMARY KEY (id_usuario, id_rol),
    CONSTRAINT fk_ur_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    CONSTRAINT fk_ur_rol FOREIGN KEY (id_rol) REFERENCES roles(id_rol) ON DELETE CASCADE
);


INSERT INTO roles (nombre_rol) VALUES 
('Administrador'),
('Turista'),
('Operador Turístico');

INSERT INTO usuarios (nombre_usuario, correo, contraseña)
VALUES ('Gabo', 'gabo@mail.com', '1234');

INSERT INTO usuarios (nombre_usuario, correo, contraseña)
VALUES ('German', 'german@mail.com', '1234');


-- Supongamos que id_usuario = 1 y id_rol = 1 (Administrador)
INSERT INTO usuario_rol (id_usuario, id_rol)
VALUES (1, 1);

-- Supongamos que id_usuario = 2 y id_rol = 2 (Turista)
INSERT INTO usuario_rol (id_usuario, id_rol)
VALUES (2, 2);

--Mirar un usuario en especial
SELECT u.*, r.nombre_rol
FROM usuarios u
JOIN usuario_rol ur ON u.id_usuario = ur.id_usuario
JOIN roles r ON ur.id_rol = r.id_rol
WHERE u.nombre_usuario = 'Gabo' AND u.contraseña = '1234';


--Mirar todos los usuarios
SELECT u.id_usuario, u.nombre_usuario, u.correo, r.nombre_rol
FROM usuarios u
JOIN usuario_rol ur ON u.id_usuario = ur.id_usuario
JOIN roles r ON ur.id_rol = r.id_rol;