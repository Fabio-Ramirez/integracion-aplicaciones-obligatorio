const { Router } = require('express');
const Curso = require('../models/curso');
const router = Router();


// Ruta para obtener todos los curso
router.get('/', (req, res) => {
    console.log("Curso: ", Curso.length);
    Curso.find()
        .then((curso) => res.json(curso))
        .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log("id: ", id)
    Curso.findOne({ nroId: id })
        .then((curso) => {
            if (!curso) {
                return res.status(404).json({ msg: 'Curso no encontrado' });
            }
            res.json(curso);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error del servidor');
        });
});

router.post('/', async (req, res) => {
    try {
        // Obtener los datos del curso del cuerpo de la solicitud
        // el nroId lo indexo restando al array, ya que por cuestion de mongoose no me deja resetear la base por completo
        const { nroId = Curso.length - 2, nombre, descripcion } = req.body;
        console.log(req.body)
        // Crear un nuevo documento de curso
        const nuevoCurso = new Curso({
            nroId,
            nombre,
            descripcion
        });

        console.log("longitud: ", Curso.length);

        // Guardar el nuevo curso en la base de datos
        const savedCurso = await nuevoCurso.save(); // Utilizamos await para esperar a que la promesa se resuelva
        res.status(201).json(savedCurso);
    } catch (error) {
        res.status(500).send('Error al guardar el curso en la base de datos');
    }

});

module.exports = router;