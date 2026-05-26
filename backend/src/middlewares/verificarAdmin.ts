import { Request, Response, NextFunction } from 'express';

export const verificarAdmin = (req: any, res: Response, next: NextFunction) => {
    if (req.user && req.user.cargo == true) {
        next();
    }
    return res.status(403).json({ error: "Somente admins podem acessar." })
};