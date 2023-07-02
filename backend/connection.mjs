import { PrismaClient } from "@prisma/client";

let prisma;

const connect = async () => {
  prisma = new PrismaClient();
  await prisma.$connect();
};

const disconnect = async () => {
  await prisma?.$disconnect();
};

export { prisma, connect, disconnect };
