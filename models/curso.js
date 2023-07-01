import mongoose from 'mongoose';

const cursoSchema = new mongoose.Schema({
    nroId: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    estudiantes: [{
        nombreEstudiante: { type: String, required: false }
    }]
});

const Curso = mongoose.model('Curso', cursoSchema);

export default Curso;