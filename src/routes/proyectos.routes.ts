import { Router } from 'express'
import { getEmpresas, getConsultores, getProyectoConsultor, getProyectosEstado, getProyectosEmpresa, getProyectosInformacion } from '../controllers/proyectos'

const router = Router();

router.route('/empresas').get(getEmpresas)
router.route('/consultores/:iApellido').get(getConsultores)
router.route('/proyectos/:id').get(getProyectoConsultor)
router.route('/proyectoempresa/:id').get(getProyectosEmpresa)
router.route('/proyectoinformacion').get(getProyectosInformacion)
router.route('/proyectoestado/:estado').get(getProyectosEstado)


export default router;