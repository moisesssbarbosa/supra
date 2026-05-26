import { prisma } from "../src/config/database";
import bcrypt from "bcryptjs";

async function main() {
    console.log('🌱 Gerando dados automaticamente...');

    await prisma.convidados.deleteMany({});
    await prisma.usuarios.deleteMany({});

    const senhaCriptografada = await bcrypt.hash('123456', 10);

    await prisma.usuarios.create({
        data: { nome: 'Admin', email: 'admin@weddingpass.com', cpf: '11111111111', cargo: true, senha: senhaCriptografada }
    });

    await prisma.usuarios.create({
        data: { nome: 'Staff', email: 'staff@weddingpass.com', cpf: '22222222222', cargo: false, senha: senhaCriptografada }
    });

    const listaConvidados = [];

    for (let i = 1; i <= 30; i++) {
        const cpfFake = String(i).padStart(11, '0');

        listaConvidados.push({
            nome: `Convidado${i}`,
            sobrenome: `Sobrenome${i}`,
            email: `convidado${i}@email.com`,
            mesa: (i % 30) + 1,
            cpf: cpfFake,
            telefone: `5199999${String(i).padStart(4, '0')}`,
            status_checkin: i % 2 === 0
        });
    }

    await prisma.convidados.createMany({
        data: listaConvidados
    });

    console.log("TUDO POPULADO SEM ESFORÇO!");
}

main()
    .catch((e) => { console.error(e);
        throw e;
    })
    .finally(async () => { await prisma.$disconnect(); });
