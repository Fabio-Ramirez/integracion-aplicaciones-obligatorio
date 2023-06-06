const { Router } = require('express');
const Estudiante = require('../models/estudiante');
const router = Router();


// Ruta para obtener todos los estudiante
router.get('/', (req, res) => {

    Estudiante.find()
        .then((estudiante) => res.json(estudiante))
        .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log("id: ", id)
    Estudiante.findOne({ nroId: id })
        .then((estudiante) => {
            console.log("estudiante: ", estudiante);
            if (!estudiante) {
                return res.status(404).json({ msg: 'Estudiante no encontrado' });
            }
            res.json(estudiante);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error del servidor');
        });
});

router.post('/', async (req, res) => {
    try {
        // Obtener los datos del estudiante del cuerpo de la solicitud
        // el nroId lo indexo restando al array, ya que por cuestion de mongoose no me deja resetear la base por completo
        const { nroId = Estudiante.length - 2, nombre, grado, edad } = req.body;
        console.log(req.body)
        // Crear un nuevo documento de estudiante
        const nuevoEstudiante = new Estudiante({
            nroId,
            nombre,
            grado, edad
        });

        console.log("longitud: ", Estudiante.length);

        // Guardar el nuevo estudiante en la base de datos
        const savedEstudiante = await nuevoEstudiante.save(); // Utilizamos await para esperar a que la promesa se resuelva
        res.status(201).json(savedEstudiante);
    } catch (error) {
        res.status(500).send('Error al guardar el estudiante en la base de datos');
    }

});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    Estudiante.findOne({ nroId: id })
        .then((estudiante) => {
            console.log("estudiante: ", estudiante);
            if (!estudiante) {
                return res.status(404).json({ msg: 'Estudiante no encontrado' });
            }
            else {

                estudiante.nombre = req.body.nombre;
                estudiante.grado = req.body.grado;
                estudiante.edad = req.body.edad;

            }
            res.json(estudiante);
        })
        .catch((error) => {
            console.error('Error al actualizar el estudiante:', error);
            res.status(500).send('Error del servidor');
        });


});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const estudiante = await Estudiante.findById(id);

        if (!estudiante) {
            return res.status(404).json({ msg: 'Estudiante no encontrado' });
        }

        await estudiante.remove();

        res.json({ msg: 'Estudiante eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el estudiante:', error);
        res.status(500).send('Error del servidor');
    }
});



module.exports = router;