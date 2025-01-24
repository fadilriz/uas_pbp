const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.user.create({
    data: {
        name :'',  
        email :'',
        password :'', 
        phone_number :'', 
        address :'',
    },
  });
  console.log('User Created:', newUser);

  // Mengambil semua pengguna
  const users = await prisma.user.findMany();
  console.log('All Users:', users);
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });