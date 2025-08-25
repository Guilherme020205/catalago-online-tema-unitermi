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

  await prisma.category.createMany({
    data: [
      { name: "Garrafas Térmicas" },
      { name: "Isotérmicas" },
      { name: "Utilidades" },
      { name: "Eletros" },
      { name: "Kits" },
    ],
    skipDuplicates: true,
  });

  await prisma.productCapacity.createMany({
    data: [
      { capacity: "250 ml" },
      { capacity: "300 ml" },
      { capacity: "350 ml" },
      { capacity: "400 ml" },
      { capacity: "450 ml" },
      { capacity: "500 ml" },
      { capacity: "600 ml" },
      { capacity: "650 ml" },
      { capacity: "750 ml" },
      { capacity: "950 ml" },
      { capacity: "1,0 L" },
      { capacity: "1,3 L" },
      { capacity: "1,5 L" },
      { capacity: "1,8 L" },
      { capacity: "2,0 L" },
      { capacity: "2,5 L" },
      { capacity: "3,0 L" },
      { capacity: "4,0 L" },
      { capacity: "4,5 L" },
      { capacity: "5,0 L" },
      { capacity: "6,0 L" },
      { capacity: "7,0 L" },
      { capacity: "7,5 L" },
      { capacity: "10,0 L" },
      { capacity: "14,0 L" },
      { capacity: "15,0 L" },
      { capacity: "16,0 L" },
      { capacity: "24,0 L" },
      { capacity: "30,0 L" },
      { capacity: "4,8 L" },
    ],
    skipDuplicates: true, 
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
