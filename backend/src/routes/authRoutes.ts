import { Router } from "express";

import { fazerLogin } from '../controllers/authControllers';

const router = Router();

router.post('/auth/login', fazerLogin);

export default router;