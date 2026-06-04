import { Router } from "express";
import { autenticar } from "../middlewares/autenticar";
import { verificarAdmin } from "../middlewares/verificarAdmin";
import {
  criarConvidados,
  atualizarCheckin,
  atualizarConvidado,
  listarConvidados,
  apagarConvidados,
} from "../controllers/convidadoControllers";

const router = Router();

router.post('/convidados', autenticar, verificarAdmin, criarConvidados);

router.patch('/convidados/:id/checkin', autenticar, atualizarCheckin);

router.put('/convidados/:id', autenticar, verificarAdmin, atualizarConvidado);

router.get('/convidados', autenticar, listarConvidados);

router.delete('/convidados/:id', autenticar, verificarAdmin, apagarConvidados);

export default router;