// User :

//     GET /users: Get all users.
//     GET /users/{id}: Get a specific user by ID.
//     POST /users: Create a new user.
//     PUT /users/{id}: Update a user by ID.

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /users
export async function getAllUsers(req, res, next) {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

// GET /users/:id
export async function getUserById(req, res, next) {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

// POST /users
export async function createUser(req, res, next) {
  const { name, email, password } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

// PUT /users/:id
export async function updateUser(req, res, next) {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id },
      data: { name, email, password },
    });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

// DELETE /users/:id
export async function deleteUser(req, res, next) {
  const { id } = req.params;

  try {
    await prisma.user.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
