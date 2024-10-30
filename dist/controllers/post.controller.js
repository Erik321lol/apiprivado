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
exports.getPosts = void 0;
exports.createPost = createPost;
exports.getPost = getPost;
exports.deletePost = deletePost;
exports.updatePost = updatePost;
// DB
const database_1 = require("../database");
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield (0, database_1.connect)();
        const [posts] = yield conn.query('SELECT * FROM posts'); // Asegúrate de que esto se ajuste a tu cliente de base de datos
        res.json(posts); // Devuelve la lista de posts
    }
    catch (e) {
        console.error(e); // Imprime el error en consola
        res.status(500).json({ message: 'Error al obtener los posts' }); // Respuesta de error al cliente
    }
});
exports.getPosts = getPosts;
function createPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPost = req.body;
        const conn = yield (0, database_1.connect)();
        yield conn.query('INSERT INTO posts SET ?', [newPost]);
        res.json({
            message: 'New Post Created'
        });
    });
}
function getPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.postId;
        const conn = yield (0, database_1.connect)();
        const posts = yield conn.query('SELECT * FROM posts WHERE id = ?', [id]);
        res.json(posts[0]);
    });
}
function deletePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.postId;
        const conn = yield (0, database_1.connect)();
        yield conn.query('DELETE FROM posts WHERE id = ?', [id]);
        res.json({
            message: 'Post deleted'
        });
    });
}
function updatePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.postId;
        const updatePost = req.body;
        const conn = yield (0, database_1.connect)();
        yield conn.query('UPDATE posts set ? WHERE id = ?', [updatePost, id]);
        res.json({
            message: 'Post Updated'
        });
    });
}
