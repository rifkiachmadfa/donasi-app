import { PrismaClient } from "@prisma/client";

const prisma = globalThis.prisma || new PrismaClient();

// Only set the global prisma in development to avoid excessive Prisma client instances in production
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export const db = prisma;
