//Cash :

//     GET /cash: Get all cash.
//     GET /cash/{id}: Get a specific cash by ID.
//     POST /cash: Create a new cash.
//     PUT /cash/{id}: Update a cash by ID.

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import jwt from 'jsonwebtoken';



// GET /cash
export async function getAllCash(req, res, next) {
  try {
    const cash = await prisma.standardCost.findMany();
    res.status(200).json(cash);
  } catch (error) {
    next(error);
  }
}

// GET /cash/:id
export async function getCashById(req, res, next) {
  const { id } = req.params;

  try {
    const cash = await prisma.standardCost.findUnique({ where: { id } });

    if (!cash) {
      return res.status(404).json({ message: "Cash not found" });
    }

    res.status(200).json(cash);
  } catch (error) {
    next(error);
  }
}

// POST /cash
export async function createCash(req, res, next) {
  const { costPerKwh } = req.body;

  try {
    const cash = await prisma.standardCost.create({
      data: {
        costPerKwh
      },
    });

    res.status(201).json(cash);
  } catch (error) {
    next(error);
  }
}

// PUT /cash/:id
export async function updateCash(req, res, next) {
  const { id } = req.params;
  const { costPerKwh  } = req.body;

  try {
    const cash = await prisma.StandardCost.update({
      where: { id },
      data: { costPerKwh  },
    });

    res.status(200).json(cash);
  } catch (error) {
    next(error);
  }
}

// DELETE /cash/:id
export async function deleteCash(req, res, next) {
  const { id } = req.params;

  try {
    await prisma.standardCost.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}