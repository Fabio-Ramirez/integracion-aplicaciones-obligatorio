const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
    nroId: { type: Number, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true }
});

const Curso = mongoose.model('Curso', cursoSchema);
cursoSchema.static('findById', function (idBuscado) {
    console.log("id buscado: ", idBuscado)
    return this.findOne({ nroId: idBuscado });
});
// Redefinir el método findById

module.exports = Curso;