import mongoose from 'mongoose';

const estudianteSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true },
    grado: { type: String, required: true },
    edad: { type: Number, required: true },
});

const Estudiante = mongoose.model('Estudiante', estudianteSchema);

export default Estudiante;