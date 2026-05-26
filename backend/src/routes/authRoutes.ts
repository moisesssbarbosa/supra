import { Router } from "express";
<<<<<<< HEAD
import { fazerLogin } from '../controllers/authControllers';
=======
import { fazerLogin } from '../controllers/authController';
>>>>>>> 74335d641d9ab9348d77565ca65c1c475e47ef3f

const router = Router();

router.post('/auth/login', fazerLogin);

export default router;