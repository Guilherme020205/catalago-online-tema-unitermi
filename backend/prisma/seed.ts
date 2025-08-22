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
