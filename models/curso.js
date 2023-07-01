import mongoose from 'mongoose';

const cursoSchema = new mongoose.Schema({
    nroId: { type: Number, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true }
});

const Curso = mongoose.model('Curso', cursoSchema);

export default Curso;