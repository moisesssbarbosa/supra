import { prisma } from "../config/database";
import { Request, Response } from "express";

export const obterMetricas = async (req: Request, res: Response) => {
    try {
        const total = await prisma.convidados.count();
        const confirmados = await prisma.convidados.count({
            where: { status_checkin: true }
        });
        
        res.status(200).json({
            total,
            confirmados,
            falttantes: total - confirmados
        });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar dados do dashboard." });
    }
};