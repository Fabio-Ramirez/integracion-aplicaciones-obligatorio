import Estudiante from '../models/estudiante.js';

export const getEstudiantes = async (req, res) => {
    try {
        // Obtener todos los estudiantes de la base de datos
        const estudiantes = await Estudiante.find();

        // Enviar una respuesta al cliente
        res.status(200).json(estudiantes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener los estudiantes' });
    }
}

//Obtener el estudiante solicitado
export const getEstudianteById = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar un estudiante por su ID en la base de datos
        const estudiante = await Estudiante.findById(id);
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        // Enviar una respuesta al cliente
        res.status(200).json(estudiante);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener el estudiante' });
    }
};

//Registrar un estudiante  
export const registerEstudiante = async (req, res) => {
    try {
        const { nombre, grado, edad } = req.body;

        // Crear un nuevo estudiante
        const newEstudiante = new Estudiante({ nombre, grado, edad });

        const existeEstudiante = await Estudiante.findOne({ nombre: nombre })
        if (existeEstudiante) {
            return res.status(400).json({ message: 'Ya existe ese estudiante' });
        }

        await newEstudiante.save();

        // Enviar una respuesta al cliente
        res.status(201).json({ message: 'Se ha creado con exito el registro del estudiante: ', newEstudiante });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al registrar el estudiante' });
    }
};

//Actualizar un estudiante
export const updateEstudiante = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, grado, edad } = req.body;

        // Buscar y actualizar el estudiante por su ID
        const estudiante = await Estudiante.findByIdAndUpdate(
            id,
            {
                nombre, grado, edad
            },
            { new: true } // Devuelve el estudiante actualizado
        );

        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        // Enviar una respuesta al cliente
        res.status(200).json({ message: 'Estudiante actualizado', estudiante });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al actualizar el estudiante' });
    }
};

//Eliminar un estudiante por el nombre como ingreso de params.
export const deleteEstudiante = async (req, res) => {
    try {
        const { nombre } = req.params;

        // Buscar el estudiante por su ID
        const estudianteEliminar = await Estudiante.findOne({ nombre: nombre });

        if (!estudianteEliminar) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        // Buscar y eliminar el estudiante por su ID
        const result = await Estudiante.deleteOne({ nombre: nombre });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Estudiante no encontrado: ', nombre });
        }
        // Enviar una respuesta al cliente
        res.status(200).json({ message: 'Fue eliminado el Estudiante' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al eliminar el estudiante' });
    }
};
