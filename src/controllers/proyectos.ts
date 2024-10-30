import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { Usuario } from '../interfaces/user'

export const getEmpresas = async (req: Request, res: Response): Promise<void> => {
    try {
        const conn = await connect();
        const [posts] = await conn.query(`
        SELECT 
            E.ID_Empresa,
            E.Nombre_Empresa,
            COUNT(P.ID_Proyecto) AS Total_Proyectos,
            GROUP_CONCAT(DISTINCT C.Nombre_Consultor) AS Consultores
            FROM 
            Empresa E
        LEFT JOIN 
            Proyecto P ON E.ID_Empresa = P.ID_Empresa AND P.Estado = 1
        LEFT JOIN 
            Consultor C ON P.ID_Consultor = C.ID_Consultor
        GROUP BY 
            E.ID_Empresa, E.Nombre_Empresa;`);
        res.json(posts); // Devuelve la lista de posts
    } catch (e) {
        console.error(e); // Imprime el error en consola
        res.status(500).json({ message: 'Error al obtener los posts' }); // Respuesta de error al cliente
    }
};

export const getConsultores = async (req: Request, res: Response): Promise<void> => {
    try {
        const inicial = req.params.iApellido; // Obtenemos el apellido del parámetro
        const conn = await connect(); // Establecemos la conexión a la base de datos

        // Corrección: pasamos el parámetro de forma correcta a la consulta
        const [posts] = await conn.query(`
            SELECT
                ID_Consultor AS Codigo,
                Nombre_Consultor AS Nombre,
                Apellido_Consultor AS Apellido,
                Telefono AS No_Telefono
            FROM 
                Consultor
            WHERE 
                Apellido_Consultor LIKE CONCAT(?, '%');`, [inicial]); // Aquí se corrige la forma de pasar `inicial`

        res.json(posts); // Devuelve la lista de consultores
    } catch (e) {
        console.error(e); // Imprime el error en consola
        res.status(500).json({ message: 'Error al obtener los consultores' }); // Respuesta de error al cliente
    }
};

export const getProyectoConsultor = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        console.log('id', id)
        const conn = await connect();
        const [posts] = await conn.query(`
        SELECT 
            P.ID_Proyecto AS Codigo_Proyecto,
            P.Nombre_Proyecto,
            E.Nombre_Empresa,
            C.Nombre_Consultor
        FROM 
            Proyecto P
        JOIN 
            Empresa E ON P.ID_Empresa = E.ID_Empresa
        JOIN 
            Consultor C ON P.ID_Consultor = C.ID_Consultor
        WHERE 
            P.ID_Consultor = ?;
        `, [id]);
        res.json(posts);
    } catch (e) {
        console.error(e); // Imprime el error en consola
        res.status(500).json({ message: 'Error al obtener los posts' });
    }
};

export const getProyectosEmpresa = async (req: Request, res: Response): Promise<void> => {
    try {
        const conn = await connect();
        const id = req.params.id;
        const [posts] = await conn.query(`
        SELECT 
            P.*,
            E.Nombre_Empresa,
            E.Direccion
        FROM 
            Proyecto P
        JOIN 
            Empresa E ON P.ID_Empresa = E.ID_Empresa
        JOIN 
            Consultor C ON P.ID_Consultor = C.ID_Consultor
        WHERE 
            P.ID_Empresa = ?;`, [id]);
        res.json(posts);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error al obtener los posts' });
    }
};

export const getProyectosInformacion = async (req: Request, res: Response): Promise<void> => {
    try {
        const conn = await connect();
        const [posts] = await conn.query(`
        SELECT 
            ID_Proyecto AS Codigo,
            Nombre_Proyecto AS Descripcion,
            Fecha_Inicio,          
            Fecha_Fin,           
            Monto                  
        FROM 
            Proyecto;`,);
        res.json(posts);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error al obtener los posts' });
    }
};

export const getProyectosEstado = async (req: Request, res: Response): Promise<void> => {
    try {
        const estado = req.params.estado; // Obtenemos el apellido del parámetro
        const conn = await connect();
        const [posts] = await conn.query(`
        SELECT 
            P.ID_Proyecto AS Codigo_Proyecto,
            P.Nombre_Proyecto AS Descripcion,
            P.fecha_inicio AS Fecha_Inicio,
            P.fecha_fin AS Fecha_Fin,
            P.monto AS Monto
        FROM 
            Proyecto P
        WHERE 
            P.estado = ?; `, [estado]);
        res.json(posts);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error al obtener los posts' });
    }
};


