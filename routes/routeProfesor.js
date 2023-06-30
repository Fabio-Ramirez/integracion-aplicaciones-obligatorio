import express from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../meddlewares/validar-campo.js';
import { getProfesores, getProfesorById, registerProfesor, updateProfesor, deleteProfesor } from '../controllers/controllersProfesor.js';

const router = express.Router();

router.get('/', getProfesores);
router.get('/:id', getProfesorById);
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ]
    , registerProfesor);
router.patch('/:id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ]
    ,
    updateProfesor);
router.delete('/:nombre',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ]
    ,
    deleteProfesor);

export default router;
