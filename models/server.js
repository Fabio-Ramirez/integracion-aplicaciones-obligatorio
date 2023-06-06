const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Estudiante = require('./estudiante');
const Profesor = require('./profesor');


class Server {

    constructor() {
        this.app = express();

        // Configuración de la conexión a la base de datos
        mongoose.connect('mongodb://localhost:27017/colegio', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => console.log('Conexión a la base de datos ingreso establecida'))
            .catch((err) => console.log(err));

        this.app.use(express.json());
        this.routes();
    }

    routes() {
        this.app.use('/colegio/estudiante', require('../routes/routeEstudiante'));
        this.app.use('/colegio/profesor', require('../routes/routeProfesor'));
        this.app.use('/colegio/curso', require('../routes/routeCurso'));
    }

    // Inicialización del servidor
    listen() {
        const PORT = process.env.PORT || 3000;
        this.app.listen(PORT, () => {
            console.log(`Hola Dev: Servidor iniciado en el puerto ${PORT}`);
        })
    }
}

module.exports = Server;