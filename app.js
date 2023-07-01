import express from 'express';
import cors from 'cors';
import cursoRoutes from './routes/routeCurso.js';
import estudianteRoutes from './routes/routeEstudiante.js';
import profesorRoutes from './routes/routeProfesor.js';

const app = express();

// Configurar middlewares
app.use(express.json());

// Habilitar CORS
app.use(cors());

// Configurar rutas
app.use('/profesor', profesorRoutes);
app.use('/estudiante', estudianteRoutes);
app.use('/curso', cursoRoutes);

export default app 