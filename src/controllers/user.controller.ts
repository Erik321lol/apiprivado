import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { Usuario } from '../interfaces/user'

export const getUsuarios = async (req: Request, res: Response): Promise<void> => {
    try {
        const conn = await connect();
        const [posts] = await conn.query('SELECT * FROM usuario'); // Asegúrate de que esto se ajuste a tu cliente de base de datos
        res.json(posts); // Devuelve la lista de posts
    } catch (e) {
        console.error(e); // Imprime el error en consola
        res.status(500).json({ message: 'Error al obtener los posts' }); // Respuesta de error al cliente
    }
};
export async function createUsuario(req: Request, res: Response) {
    const newUsuario: Usuario = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO usuario SET ?', [newUsuario]);
    res.json({
        message: 'New usuario Created'
    });
}

export async function getUsuario(req: Request, res: Response) {
    const id = req.params.id;
    const conn = await connect();
    const posts = await conn.query('SELECT * FROM usuario WHERE correo = ?', [id]);
    res.json(posts[0]);
}

export async function deleteUsuario(req: Request, res: Response) {
    const id = req.params.id;
    const conn = await connect();
    await conn.query('DELETE FROM usuario WHERE id = ?', [id]);
    res.json({
        message: 'usuario deleted'
    });
}

export async function updateUsuario(req: Request, res: Response) {
    const id = req.params.id;
    const upadateUsuario: Usuario = req.body;
    const conn = await connect();
    await conn.query('UPDATE usuario set ? WHERE id = ?', [upadateUsuario, id]);
    res.json({
        message: 'usuario Updated'
    });
}