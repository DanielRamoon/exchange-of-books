import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const user = await prisma.user.create({
      data: {
        name: "Usuário Teste",
        email: `teste${Date.now()}@teste.com`,
        password: "123456",
      },
    });
    console.log("Usuário criado:", user);
  } catch (error) {
    console.error("Erro ao conectar ou criar usuário:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
