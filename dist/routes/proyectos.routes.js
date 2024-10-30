"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proyectos_1 = require("../controllers/proyectos");
const router = (0, express_1.Router)();
router.route('/empresas').get(proyectos_1.getEmpresas);
router.route('/consultores/:iApellido').get(proyectos_1.getConsultores);
router.route('/proyectos/:id').get(proyectos_1.getProyectoConsultor);
router.route('/proyectoempresa/:id').get(proyectos_1.getProyectosEmpresa);
router.route('/proyectoinformacion').get(proyectos_1.getProyectosInformacion);
router.route('/proyectoestado/:estado').get(proyectos_1.getProyectosEstado);
exports.default = router;
