import Profesor from '../models/profesor.js';
import bcrypt from 'bcryptjs';


export const getProfesores = async (req, res) => {
    try {
        // Obtener todos los profesores de la base de datos
        const profesores = await Profesor.find();

        // Enviar una respuesta al cliente
        res.status(200).json(profesores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener los profesores' });
    }
}

//Obtener el profesor solicitado
export const getProfesorById = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar un profesor por su ID en la base de datos
        const profesor = await Profesor.findById(id);
        if (!profesor) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }

        // Enviar una respuesta al cliente
        res.status(200).json(profesor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener el profesor' });
    }
};

//Registrar un profesor, verificando q no exista ninguno con el mismo nombre  
export const registerProfesor = async (req, res) => {
    try {
        const { nombre, especialidad, email, password } = req.body;

        // Encriptar la contraseña antes de guardarla en la base de datos
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear un nuevo profesor
        const newProfesor = new Profesor({ nombre, especialidad, email, password: hashedPassword });

        const existeProfesor = await Profesor.findOne({ nombre: nombre })
        if (existeProfesor) {
            return res.status(400).json({ message: 'Ya existe ese profesor' });
        }

        await newProfesor.save();

        // Enviar una respuesta al cliente
        res.status(201).json({ message: 'Se ha creado con exito el registro del profesor: ', newProfesor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al registrar el profesor' });
    }
};

//Actualizar un profesor
export const updateProfesor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, especialidad, email, password } = req.body;

        // Buscar y actualizar el profesor por su ID
        const profesor = await Profesor.findByIdAndUpdate(
            id,
            {
                nombre, especialidad, email, password
            },
            { new: true } // Devuelve el profesor actualizado
        );

        if (!profesor) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }

        // Enviar una respuesta al cliente
        res.status(200).json({ message: 'Profesor actualizado', profesor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al actualizar el profesor' });
    }
};

//Eliminar un profesor por el nombre como ingreso de params.
export const deleteProfesor = async (req, res) => {
    try {
        const { nombre } = req.params;

        // Buscar el profesor por su ID
        const profesorEliminar = await Profesor.findOne({ nombre: nombre });

        if (!profesorEliminar) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }
        // Buscar y eliminar el profesor por su ID
        const result = await Profesor.deleteOne({ nombre: nombre });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Profesor no encontrado: ', nombre });
        }
        // Enviar una respuesta al cliente
        res.status(200).json({ message: 'Fue eliminado el Profesor' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al eliminar el profesor' });
    }
};


export const loginProfesor = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar al profesor por su email en la base de datos
        const profesor = await Profesor.findOne({ email });

        if (!profesor) {
            return res.status(404).json({ message: 'El profesor no está registrado' });
        }

        // Validar la contraseña ingresada utilizando bcrypt.compare()
        console.log(password, " pass ", profesor.password)
        const isPasswordValid = await bcrypt.compare(password, profesor.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'La contraseña es incorrecta' });
        }

        // La contraseña es válida, puedes generar un token de autenticación y enviarlo en la respuesta
        // ...

        res.json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};
