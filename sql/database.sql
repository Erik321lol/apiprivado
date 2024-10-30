-- Crear la base de datos
CREATE DATABASE privado;

-- Usar la base de datos creada
USE privado;

-- Crear la tabla 'usuario'
CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- Campo id como clave primaria y autoincrementable
    title VARCHAR(255) NOT NULL,        -- Campo para el título
    descripcion TEXT,                    -- Campo para la descripción
    image_url VARCHAR(255),              -- Campo para la URL de la imagen
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Campo para la fecha de creación
);
