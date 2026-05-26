import { Router } from "express";
<<<<<<< HEAD
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

router.put('/convidados/id', autenticar, verificarAdmin, atualizarConvidado);

router.get('/convidados', autenticar, listarConvidados);

router.delete('/convidados/:id', autenticar, verificarAdmin, apagarConvidados);
=======
import { autenticar } from '../middlewares/autenticar';
import { verificarAdmin } from "../middlewares/verificarAdmin";
import {
  criarConvidados,
  listarConvidados,
  atualizarCheckin,
  atualizarConvidados,
  apagarConvidados,
} from "../controllers/convidadoController";

const router = Router();

router.post("/convidados", autenticar, verificarAdmin, criarConvidados);

router.get("/convidados", autenticar, listarConvidados);

router.patch("/convidados/:id/checkin", autenticar, atualizarCheckin);

router.put("/convidados/:id", autenticar, verificarAdmin, atualizarConvidados);

router.delete("/convidados/:id", autenticar, verificarAdmin, apagarConvidados);
>>>>>>> 74335d641d9ab9348d77565ca65c1c475e47ef3f

export default router;