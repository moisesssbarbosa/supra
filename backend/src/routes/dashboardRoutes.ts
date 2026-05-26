import { Router } from "express";
<<<<<<< HEAD
import { obterMetricas } from '../controllers/dashboardControllers';
import { autenticar } from "../middlewares/autenticar";
import { verificarAdmin } from "../middlewares/verificarAdmin";

export const router = Router();
=======
import { autenticar } from "../middlewares/autenticar";
import { verificarAdmin } from "../middlewares/verificarAdmin";
import { obterMetricas } from '../controllers/dashboardController';

const router = Router();
>>>>>>> 74335d641d9ab9348d77565ca65c1c475e47ef3f

router.get('/dashboard', autenticar, verificarAdmin, obterMetricas);

export default router;