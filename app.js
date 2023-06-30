import express from 'express';
import cors from 'cors';
/*import routeCurso from './routes/routeCurso.js';
import routeEstudiante from './routes/routeEstudiante.js';*/
import profesorRoutes from './routes/routeProfesor.js';

const app = express();

// Configurar middlewares
app.use(express.json());

// Habilitar CORS
app.use(cors());

// Configurar rutas
app.use('/profesor', profesorRoutes);

export default app 