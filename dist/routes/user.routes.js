"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.route('/')
    .get(user_controller_1.getUsuarios)
    .post(user_controller_1.createUsuario);
router.route('/:id')
    .get(user_controller_1.getUsuario)
    .delete(user_controller_1.deleteUsuario)
    .put(user_controller_1.updateUsuario);
exports.default = router;
