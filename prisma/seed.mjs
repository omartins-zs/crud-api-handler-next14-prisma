const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    const defaultUsers = [
        { name: "Gabriel Martins" },
        { name: "Operador de Teste" },
        { name: "Maria Oliveira" }
    ];

    console.log("Iniciando seed do banco de dados...");

    for (const item of defaultUsers) {
        const exists = await prisma.user.findFirst({
            where: { name: item.name }
        });

        if (!exists) {
            const created = await prisma.user.create({ data: item });
            console.log(`Usuário criado: [${created.id}] ${created.name}`);
        } else {
            console.log(`Usuário já existente: [${exists.id}] ${exists.name}`);
        }
    }

    console.log("Seed concluído com sucesso!");
}

main()
    .catch((e) => {
        console.error("Erro ao executar seed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
