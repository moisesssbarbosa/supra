import { Router } from "express";
import { obterMetricas } from '../controllers/dashboardControllers';
import { autenticar } from "../middlewares/autenticar";
import { verificarAdmin } from "../middlewares/verificarAdmin";

export const router = Router();

router.get('/dashboard', autenticar, verificarAdmin, obterMetricas);

export default router;