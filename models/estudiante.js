const mongoose = require('mongoose');

const estudianteSchema = new mongoose.Schema({
    nroId: { type: Number, required: true },
    nombre: { type: String, required: true },
    grado: { type: String, required: true },
    edad: { type: Number, required: true },
});

const Estudiante = mongoose.model('Estudiante', estudianteSchema);
estudianteSchema.statics.findById = function (id) {
    console.log("pasa por la redefinicio")
    return this.findOne({ nroId: id });
};
// Redefinir el método findById

// Método estático personalizado para buscar y actualizar por nroId
estudianteSchema.statics.findOneAndUpdateByNroId = async function (nroId, update) {
    return this.findOneAndUpdate({ nroId }, update, { new: true });
};


module.exports = Estudiante;