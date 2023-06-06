const mongoose = require('mongoose');

const profesorSchema = new mongoose.Schema({
    nroId: { type: Number, required: true },
    nombre: { type: String, required: true },
    especialidad: { type: String, required: true },
    email: { type: String, required: true },
});

const Profesor = mongoose.model('Profesor', profesorSchema);
profesorSchema.static('findById', function (idBuscado) {
    console.log("id buscado: ", idBuscado)
    return this.findOne({ nroId: idBuscado });
});
// Redefinir el método findById

module.exports = Profesor;