"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProyectosEstado = exports.getProyectosInformacion = exports.getProyectosEmpresa = exports.getProyectoConsultor = exports.getConsultores = exports.getEmpresas = void 0;
// DB
const database_1 = require("../database");
const getEmpresas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield (0, database_1.connect)();
        const [posts] = yield conn.query(`
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
    }
    catch (e) {
        console.error(e); // Imprime el error en consola
        res.status(500).json({ message: 'Error al obtener los posts' }); // Respuesta de error al cliente
    }
});
exports.getEmpresas = getEmpresas;
const getConsultores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inicial = req.params.iApellido; // Obtenemos el apellido del parámetro
        const conn = yield (0, database_1.connect)(); // Establecemos la conexión a la base de datos
        // Corrección: pasamos el parámetro de forma correcta a la consulta
        const [posts] = yield conn.query(`
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
    }
    catch (e) {
        console.error(e); // Imprime el error en consola
        res.status(500).json({ message: 'Error al obtener los consultores' }); // Respuesta de error al cliente
    }
});
exports.getConsultores = getConsultores;
const getProyectoConsultor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log('id', id);
        const conn = yield (0, database_1.connect)();
        const [posts] = yield conn.query(`
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
    }
    catch (e) {
        console.error(e); // Imprime el error en consola
        res.status(500).json({ message: 'Error al obtener los posts' });
    }
});
exports.getProyectoConsultor = getProyectoConsultor;
const getProyectosEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield (0, database_1.connect)();
        const id = req.params.id;
        const [posts] = yield conn.query(`
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
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error al obtener los posts' });
    }
});
exports.getProyectosEmpresa = getProyectosEmpresa;
const getProyectosInformacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield (0, database_1.connect)();
        const [posts] = yield conn.query(`
        SELECT 
            ID_Proyecto AS Codigo,
            Nombre_Proyecto AS Descripcion,
            Fecha_Inicio,          
            Fecha_Fin,           
            Monto                  
        FROM 
            Proyecto;`);
        res.json(posts);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error al obtener los posts' });
    }
});
exports.getProyectosInformacion = getProyectosInformacion;
const getProyectosEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estado = req.params.estado; // Obtenemos el apellido del parámetro
        const conn = yield (0, database_1.connect)();
        const [posts] = yield conn.query(`
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
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error al obtener los posts' });
    }
});
exports.getProyectosEstado = getProyectosEstado;
