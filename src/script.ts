import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({ log: ['query'] });

async function main() {
  await prisma.userActivity.createMany({ data: [] });

  await prisma.userActivity.findMany({
    where: {
      userId: ''
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 2,
    skip: 1
  });

  await prisma.userActivity.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    take: 2,
    skip: 1
  });
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
