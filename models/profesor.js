import mongoose from 'mongoose';

const profesorSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true },
    especialidad: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false }
});

const Profesor = mongoose.model('Profesor', profesorSchema);

export default Profesor;