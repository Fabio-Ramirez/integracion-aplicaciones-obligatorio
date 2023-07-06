import express from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../meddlewares/validar-campo.js';
import { getProfesores, getProfesorById, registerProfesor, updateProfesor, deleteProfesor, loginProfesor } from '../controllers/controllersProfesor.js';

const router = express.Router();

//Obtener todos los profesores
router.get('/', getProfesores);
//Obtener un profesor por su ID
router.get('/:id', getProfesorById);
//Crear un nuevo profesor
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email').trim().not().isEmpty().withMessage('Este campo es obligatorio').isEmail().withMessage('Debe proporcionar un correo electrónico válido'),
        validarCampos
    ]
    , registerProfesor);
//Actualizar un profesor existente    
router.patch('/:id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email').trim().not().isEmpty().withMessage('Este campo es obligatorio').isEmail().withMessage('Debe proporcionar un correo electrónico válido'),
        validarCampos
    ]
    ,
    updateProfesor);
//Eliminar un profesor   
router.delete('/:nombre',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ]
    ,
    deleteProfesor);

router.post('/login',
    [
        check('email').trim().not().isEmpty().withMessage('Este campo es obligatorio').isEmail().withMessage('Debe proporcionar un correo electrónico válido'),

    ],
    loginProfesor);

export default router;
