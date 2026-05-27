import { z } from 'zod';
import { cpf } from 'cpf-cnpj-validator';
import bcrypt from 'bcryptjs';

const apenasLetrasRegex = /^[A-Za-zÀ-ÿ ]+$/;

export const usuariosFormatador = z.object({
    nome: z.string().min(3,"O nome deve ter no mínimo 3 letras.")
        .refine(val => apenasLetrasRegex.test(val), {
            message: "O nome deve conter somente letras."
        }),
    email: z.email("Formato de e-mail inválido."),
    cargo: z.boolean({ message: "O campo deve ser verdadeiro (true) ou falso (false)." }),
    senha: z.string()
        .min(6,"A senha deve ter no mínimo 6 caracteres.")
        .transform(val => {
            return bcrypt.hashSync(val, 10);
        }),
    cpf: z.string()
        .transform(val => val.replace(/\D/g, ""))
        .refine(val => cpf.isValid(val), { message: "CPF inválido de acordo com a receita federal." })
});