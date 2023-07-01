import express from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../meddlewares/validar-campo.js';
import { getCursos, getCursoById, registerCurso, updateCurso, deleteCurso, agregarEstudiante } from '../controllers/controllersCurso.js';

const router = express.Router();

router.get('/', getCursos);
router.get('/:id', getCursoById);
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ]
    , registerCurso);
router.patch('/:id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ]
    ,
    updateCurso);
router.delete('/:nroId',
    [
        check('nroId', 'El nro de id es obligatorio').not().isEmpty(),
        validarCampos
    ]
    ,
    deleteCurso);
router.post('/:idCurso',
    [
        check('idCurso', 'El idCurso es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ]
    , agregarEstudiante);

export default router;
