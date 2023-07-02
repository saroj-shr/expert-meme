// PowerConsumption:

//     GET /powerConsumptions: Get all power consumption records.
//     GET /powerConsumptions/{id}: Get a specific power consumption record by ID.
//     POST /powerConsumptions: Create a new power consumption record.
//     PUT /powerConsumptions/{id}: Update a power consumption record by ID.
//     DELETE /powerConsumptions/{id}: Delete a power consumption record by ID.
//     GET /powerConsumptions/{id}/meter: Get the meter associated with a specific power consumption record.

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /powerConsumptions
export async function getAllPowerConsumptions(req, res, next) {
  try {
    const powerConsumptions = await prisma.powerConsumption.findMany();
    res.status(200).json(powerConsumptions);
  } catch (error) {
    next(error);
  }
}

// GET /powerConsumptions/:id
export async function getPowerConsumptionById(req, res, next) {
  const { id } = req.params;

  try {
    const powerConsumption = await prisma.powerConsumption.findUnique({
      where: { id },
      include: { meter: true },
    });

    if (!powerConsumption) {
      return res
        .status(404)
        .json({ message: "Power consumption record not found" });
    }

    res.status(200).json(powerConsumption);
  } catch (error) {
    next(error);
  }
}

// POST /powerConsumptions
export async function createPowerConsumption(req, res, next) {
  const { consumption, meterId } = req.body;

  try {
    const powerConsumption = await prisma.powerConsumption.create({
      data: {
        consumption,
        meter: { connect: { id: meterId } },
      },
    });

    res.status(201).json(powerConsumption);
  } catch (error) {
    next(error);
  }
}

// PUT /powerConsumptions/:id
export async function updatePowerConsumption(req, res, next) {
  const { id } = req.params;
  const { consumption } = req.body;

  try {
    const powerConsumption = await prisma.powerConsumption.update({
      where: { id },
      data: { consumption },
    });

    res.status(200).json(powerConsumption);
  } catch (error) {
    next(error);
  }
}

// DELETE /powerConsumptions/:id
export async function deletePowerConsumption(req, res, next) {
  const { id } = req.params;

  try {
    await prisma.powerConsumption.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

// GET /powerConsumptions/:id/meter
export async function getPowerConsumptionMeter(req, res, next) {
  const { id } = req.params;

  try {
    const powerConsumption = await prisma.powerConsumption.findUnique({
      where: { id },
      include: { meter: true },
    });

    if (!powerConsumption) {
      return res
        .status(404)
        .json({ message: "Power consumption record not found" });
    }

    res.status(200).json(powerConsumption.meter);
  } catch (error) {
    next(error);
  }
}
