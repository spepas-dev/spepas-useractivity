import { PrismaClient } from '@prisma/client';
import { config } from '@useractivity/config';

declare global {
  namespace globalThis {
    // eslint-disable-next-line no-var
    var prismadb: PrismaClient;
  }
}

const prisma = new PrismaClient();

if (config.NODE_ENV === 'production') {
  global.prismadb = prisma;
}

export default prisma;
