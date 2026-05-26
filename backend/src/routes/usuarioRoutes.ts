import { Router } from "express";
import { criarUsuario } from '../controllers/usuarioControllers';
import { autenticar } from "../middlewares/autenticar";
import { verificarAdmin } from "../middlewares/verificarAdmin";

const router = Router();

router.post('/usuarios', autenticar, verificarAdmin, criarUsuario);

export default router;