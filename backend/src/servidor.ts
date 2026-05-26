<<<<<<< HEAD
import express from "express";
import cors from 'cors';
import * as dotenv from 'dotenv';
import convidadosRoutes from './routes/convidadoRoutes';
import authRoutes from './routes/authRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
=======
import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import convidadosRoutes from './routes/convidadoRoutes';
import usuariosRoutes from './routes/usuarioRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import authRoutes from './routes/authRoutes';
>>>>>>> 74335d641d9ab9348d77565ca65c1c475e47ef3f

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use(convidadosRoutes);
<<<<<<< HEAD
app.use(usuarioRoutes);
=======
app.use(usuariosRoutes);
>>>>>>> 74335d641d9ab9348d77565ca65c1c475e47ef3f
app.use(authRoutes);
app.use(dashboardRoutes);

const PORTA = process.env.PORTA;
app.listen(PORTA, () => {
<<<<<<< HEAD
    console.log(`SERVIDOR NO AR NA PORTA: ${PORTA}!`)
=======
    console.log(`SERVIDOR NO AR EM: ${PORTA}`)
>>>>>>> 74335d641d9ab9348d77565ca65c1c475e47ef3f
});