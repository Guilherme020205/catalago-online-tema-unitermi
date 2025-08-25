import prisma from "../src/database";
import bcrypt from "bcrypt";

async function main() {
  const password = "1";
  const hashedPassword = await bcrypt.hash(password, 10); // criptografia da senha

  await prisma.user.upsert({
    where: { user: "admin" },
    update: {},
    create: {
      user: "admin",
      password: hashedPassword,
    },
  });

  await prisma.colorLine.createMany({
    data: [
      { name: "Azul", code: "#1b3563" },
      { name: "Bege", code: "#e4d3c1" },
      { name: "Branco", code: "#fcfcfc" },
      { name: "Cinza", code: "#d9d9d9" },
      { name: "Marrom", code: "#21160b" },
      { name: "Preto", code: "#000000" },
      { name: "Verde", code: "#89af7d" },
      { name: "Vermelho", code: "#9b2221" },
    ],
    skipDuplicates: true, // evita erro caso já exista
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  });
