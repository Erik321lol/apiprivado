export interface Usuario {
    id: number;                                   // Campo id como clave primaria
    nombre: string;                               // Campo para el nombre
    apellido: string;                             // Campo para el apellido
    correo: string;                               // Campo para el correo, único y no nulo
    contrasena: string;                           // Campo para la contraseña
    telefono?: string;                            // Campo para el número de teléfono (opcional)
    direccion?: string;                           // Campo para la dirección (opcional)
    fecha_nacimiento?: Date;                      // Campo para la fecha de nacimiento (opcional)
    rol: 'admin' | 'usuario' | 'invitado';       // Campo para el rol del usuario
    estado: 'activo' | 'inactivo';                // Campo para el estado del usuario
    created_at: Date;                             // Campo para la fecha de creación
    updated_at: Date;                             // Campo para la fecha de actualización
}
