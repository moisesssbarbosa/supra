import { z } from 'zod';
import { cpf } from 'cpf-cnpj-validator';
import bcrypt from 'bcryptjs';

const apenasLetrasRegex = /^[A-Za-zÀ-ÿ ]+$/;

export const usuariosFormatador = z.object({
<<<<<<< HEAD
    nome: z.string().min(3,"O nome deve ter no mínimo 3 letras.")
        .refine(val => apenasLetrasRegex.test(val), {
            message: "O nome deve conter somente letras."
        }),
    email: z.email("Formato de e-mail inválido."),
    cargo: z.boolean({ message: "O campo deve ser verdadeiro (true) ou falso (false)." }),
    senha: z.string()
        .min(6,"A senha deve ter no mínimo 6 caracteres.")
=======
    nome: z.string().min(3,"O nome deve ter no mínimo 3 caracteres.")
        .refine(val => apenasLetrasRegex.test(val), {
            message: "O nome deve conter apenas letras."
        }),
    email: z.email("Formato de e-mail inválido."),
    cargo: z.boolean({ message: "Campo obrigatório verdadeiro (true) ou falso (false)" }),
    senha: z.string()
        .min(6,"A senha deve conter no mínimo 6 caracteres.")
>>>>>>> 74335d641d9ab9348d77565ca65c1c475e47ef3f
        .transform(val => {
            return bcrypt.hashSync(val, 10);
        }),
    cpf: z.string()
<<<<<<< HEAD
        .transform(val => val.replace(/\D/g, ""))
        .refine(val => cpf.isValid(val), { message: "CPF inválido de acordo com a receita federal." })
=======
    .transform(val => val.replace(/\D/g, ""))
    .refine(val => cpf.isValid(val), { message: "CPF inválido de acordo com a receita federal."})
>>>>>>> 74335d641d9ab9348d77565ca65c1c475e47ef3f
});