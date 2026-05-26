<<<<<<< HEAD
import { Request, Response, NextFunction } from 'express';

export const verificarAdmin = (req: any, res: Response, next: NextFunction) => {
    if (req.user && req.user.cargo == true) {
        next();
    }
    return res.status(403).json({ error: "Somente admins podem acessar." })
=======
import { Response, NextFunction } from "express";

export const verificarAdmin = (req: any, res: Response, next: NextFunction) => {
    if (req.user && req.user.cargo == true) {
        return next();
    }
    return res.status(403).json({ error: "Acesso negado, apenas administradores."})
>>>>>>> 74335d641d9ab9348d77565ca65c1c475e47ef3f
};