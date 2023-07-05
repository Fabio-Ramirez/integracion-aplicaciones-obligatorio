import express from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../meddlewares/validar-campo.js';
import { getCursos, getCursoById, registerCurso, updateCurso, deleteCurso, agregarEstudiante, estudiantesEnXCurso, cursosEnXEstudiantes } from '../controllers/controllersCurso.js';

const router = express.Router();

//Obtener todos los cursos
router.get('/', getCursos);
//Obtener un curso por su ID
router.get('/:id', getCursoById);
//Obtener todos los cursos
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ]
    , registerCurso);
//Actualizar un curso existente   
router.patch('/:id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ]
    ,
    updateCurso);
//Actualizar un curso existente    
router.delete('/:nroId',
    [
        check('nroId', 'El nro de id es obligatorio').not().isEmpty(),
        validarCampos
    ]
    ,
    deleteCurso);
//Agregar un estudiante a un curso
router.post('/:idCurso',
    [
        check('idCurso', 'El idCurso es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ]
    , agregarEstudiante);
//Obtener todos los estudiantes de un curso
router.get('/estudiantesEnCurso/:idCurso',
    [
        check('idCurso', 'El idCurso es obligatorio').not().isEmpty(),
        validarCampos
    ]
    , estudiantesEnXCurso);

//Obtener todos los estudiantes de un curso
router.get('/cursoEnEstudiante/:nombreEstudiante',
    [
        check('nombreEstudiante', 'El nombreEstudiante es obligatorio').not().isEmpty(),
        validarCampos
    ]
    , cursosEnXEstudiantes);

export default router;
