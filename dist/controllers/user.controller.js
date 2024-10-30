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
exports.getUsuarios = void 0;
exports.createUsuario = createUsuario;
exports.getUsuario = getUsuario;
exports.deleteUsuario = deleteUsuario;
exports.updateUsuario = updateUsuario;
// DB
const database_1 = require("../database");
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield (0, database_1.connect)();
        const [posts] = yield conn.query('SELECT * FROM usuario'); // Asegúrate de que esto se ajuste a tu cliente de base de datos
        res.json(posts); // Devuelve la lista de posts
    }
    catch (e) {
        console.error(e); // Imprime el error en consola
        res.status(500).json({ message: 'Error al obtener los posts' }); // Respuesta de error al cliente
    }
});
exports.getUsuarios = getUsuarios;
function createUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUsuario = req.body;
        const conn = yield (0, database_1.connect)();
        yield conn.query('INSERT INTO usuario SET ?', [newUsuario]);
        res.json({
            message: 'New usuario Created'
        });
    });
}
function getUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const conn = yield (0, database_1.connect)();
        const posts = yield conn.query('SELECT * FROM usuario WHERE correo = ?', [id]);
        res.json(posts[0]);
    });
}
function deleteUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const conn = yield (0, database_1.connect)();
        yield conn.query('DELETE FROM usuario WHERE id = ?', [id]);
        res.json({
            message: 'usuario deleted'
        });
    });
}
function updateUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const upadateUsuario = req.body;
        const conn = yield (0, database_1.connect)();
        yield conn.query('UPDATE usuario set ? WHERE id = ?', [upadateUsuario, id]);
        res.json({
            message: 'usuario Updated'
        });
    });
}
