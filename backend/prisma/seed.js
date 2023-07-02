import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  try {
    // Create users
    const users = [
      {
        name: "Admin",
        email: "admin@example.com",
        password: "password123",
      },
    ];

    for (const user of users) {
      await prisma.user.create({
        data: user,
      });
    }

    console.log("User seed data inserted successfully.");
  } catch (error) {
    console.error("Error seeding user data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
