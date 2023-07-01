import express from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../meddlewares/validar-campo.js';
import { getEstudiantes, getEstudianteById, registerEstudiante, updateEstudiante, deleteEstudiante } from '../controllers/controllersEstudiante.js';

const router = express.Router();

router.get('/', getEstudiantes);
router.get('/:id', getEstudianteById);
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ]
    , registerEstudiante);
router.patch('/:id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ]
    ,
    updateEstudiante);
router.delete('/:nombre',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ]
    ,
    deleteEstudiante);

export default router;
