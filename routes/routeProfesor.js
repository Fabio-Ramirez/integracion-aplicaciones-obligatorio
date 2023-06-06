const { Router } = require('express');
const Profesor = require('../models/profesor');
const router = Router();


// Ruta para obtener todos los profesor
router.get('/', (req, res) => {
    console.log("Profesor: ", Profesor.length);
    Profesor.find()
        .then((profesor) => res.json(profesor))
        .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log("id: ", id)
    Profesor.findOne({ nroId: id })
        .then((profesor) => {
            if (!profesor) {
                return res.status(404).json({ msg: 'Profesor no encontrado' });
            }
            res.json(profesor);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error del servidor');
        });
});

router.post('/', async (req, res) => {
    try {
        // Obtener los datos del profesor del cuerpo de la solicitud
        // el nroId lo indexo restando al array, ya que por cuestion de mongoose no me deja resetear la base por completo
        const { nroId = Profesor.length - 2, nombre, especialidad, email } = req.body;
        console.log(req.body)
        // Crear un nuevo documento de profesor
        const nuevoProfesor = new Profesor({
            nroId,
            nombre,
            especialidad, email
        });

        console.log("longitud: ", Profesor.length);

        // Guardar el nuevo profesor en la base de datos
        const savedProfesor = await nuevoProfesor.save(); // Utilizamos await para esperar a que la promesa se resuelva
        res.status(201).json(savedProfesor);
    } catch (error) {
        res.status(500).send('Error al guardar el profesor en la base de datos');
    }

});

module.exports = router;