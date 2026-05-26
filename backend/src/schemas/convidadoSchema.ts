import { z } from 'zod';
import { cpf } from 'cpf-cnpj-validator';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

<<<<<<< HEAD
const apenasLetrasRegex  = /^[A-Za-zÀ-ÿ ]+$/;

export const convidadosFormatador = z.object({
    nome: z.string()
        .min(3,"O nome deve ter no mínimo 3 letras.")
        .refine(val => apenasLetrasRegex.test(val), { 
            message: "O nome deve conter apenas letras."
        }),
    sobrenome: z.string().min(3,"O sobrenome deve ter no mínimo 3 letras.")
    .refine(val => apenasLetrasRegex.test(val), { 
        message: "O sobrenome deve conter apenas letras."
    }),
=======
const apenasLetrasRegex = /^[A-Za-zÀ-ÿ ]+$/;

export const convidadosFormatador = z.object({
    nome: z.string()
        .min(3,"O nome deve ter no mínimo 3 caracteres.")
        .refine(val => apenasLetrasRegex.test(val), {
            message: "O nome deve conter apenas letras."
        }),
    sobrenome: z.string().min(3,"O sobrenome deve ter no mínimo 3 caracteres.")
        .refine(val => apenasLetrasRegex.test(val), {
            message: "O sobrenome deve conter apenas letras."
        }),
>>>>>>> 74335d641d9ab9348d77565ca65c1c475e47ef3f
    email: z.email("Formato de e-mail inválido."),
    mesa: z.number().int().positive("A mesa deve ser um número positivo."),
    telefone: z.string()
        .refine(val => {
            const numeroTelefone = parsePhoneNumberFromString(val, "BR");
            return numeroTelefone ? numeroTelefone.isValid() : false;
<<<<<<< HEAD
        }, { message: "Número de telefone inválido para o padrão brasileiro." })
=======
        }, { message: "Número de telefone inválido para o padrão brasileiro."})
>>>>>>> 74335d641d9ab9348d77565ca65c1c475e47ef3f
        .refine(val => !/^(.)\1+$/.test(val.replace(/\D/g, "")), {
            message: "O número de telefone não pode conter todos os dígitos iguais."
        })
        .transform(val => {
            const apenasNumero = val.replace(/\D/g, "");
<<<<<<< HEAD

=======
            
>>>>>>> 74335d641d9ab9348d77565ca65c1c475e47ef3f
            if (apenasNumero.startsWith("55") && apenasNumero.length > 11) {
                const sem55 = apenasNumero.substring(2)
                return sem55;
            }
            return apenasNumero;
        }),
    cpf: z.string()
<<<<<<< HEAD
        .transform(val => val.replace(/\D/g, ""))
        .refine(val => cpf.isValid(val), { message: "CPF inválido de acordo com a receita federal."} )            
=======
    .transform(val => val.replace(/\D/g, ""))
    .refine(val => cpf.isValid(val), { message: "CPF inválido de acordo com a receita federal."})
>>>>>>> 74335d641d9ab9348d77565ca65c1c475e47ef3f
});