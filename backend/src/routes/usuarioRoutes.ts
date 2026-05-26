import { Router } from "express";
<<<<<<< HEAD
import { autenticar } from "../middlewares/autenticar";
import { verificarAdmin } from "../middlewares/verificarAdmin";
import { criarUsuario } from "../controllers/usuarioControllers";

export const router = Router();

router.get('/usuarios', autenticar, verificarAdmin, criarUsuario);
=======
import { criarUsuarios } from '../controllers/usuarioController';
import { autenticar } from "../middlewares/autenticar";
import { verificarAdmin } from "../middlewares/verificarAdmin";

const router = Router();

router.post('/usuarios', autenticar, verificarAdmin, criarUsuarios);
>>>>>>> 74335d641d9ab9348d77565ca65c1c475e47ef3f

export default router;