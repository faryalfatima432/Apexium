import bcrypt from "bcryptjs";

async function run() {
  const hashedPassword = await bcrypt.hash("apexium3418", 10);
  console.log(hashedPassword);
}

run();