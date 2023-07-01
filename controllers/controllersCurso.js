import Curso from '../models/curso.js';


export const getCursos = async (req, res) => {
    try {
        // Obtener todos los Cursos de la base de datos
        const cursos = await Curso.find();

        // Enviar una respuesta al cliente
        res.status(200).json(cursos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener los cursos' });
    }
}

//Obtener el curso solicitado
export const getCursoById = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar un curso por su ID en la base de datos
        const curso = await Curso.findById(id);
        if (!curso) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }

        // Enviar una respuesta al cliente
        res.status(200).json(curso);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener el curso' });
    }
};

//Registrar un curso  
export const registerCurso = async (req, res) => {
    try {
        const { nroId, nombre, descripcion } = req.body;

        // Crear un nuevo curso
        const newCurso = new Curso({ nroId, nombre, descripcion });

        const existeCurso = await Curso.findOne({ nroId: nroId })
        if (existeCurso) {
            return res.status(400).json({ message: 'Ya existe ese curso' });
        }

        await newCurso.save();

        // Enviar una respuesta al cliente
        res.status(201).json({ message: 'Se ha creado con exito el registro del curso: ', newCurso });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al registrar el curso' });
    }
};

//Actualizar un curso
export const updateCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        // Buscar y actualizar el curso por su ID
        const curso = await Curso.findByIdAndUpdate(
            id,
            {
                nombre, descripcion
            },
            { new: true } // Devuelve el curso actualizado
        );

        if (!curso) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }

        // Enviar una respuesta al cliente
        res.status(200).json({ message: 'Curso actualizado', curso });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al actualizar el curso' });
    }
};

//Eliminar un curso por el nroId como ingreso en params.
export const deleteCurso = async (req, res) => {
    try {
        const { nroId } = req.params;

        // Buscar el curso por su ID
        const cursoEliminar = await Curso.findOne({ nroId: nroId });

        if (!cursoEliminar) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }
        // Buscar y eliminar el curso por su ID
        const result = await Curso.deleteOne({ nroId: nroId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Curso no encontrado: ', nroId });
        }
        // Enviar una respuesta al cliente
        res.status(200).json({ message: 'Fue eliminado el Curso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al eliminar el curso' });
    }
};
