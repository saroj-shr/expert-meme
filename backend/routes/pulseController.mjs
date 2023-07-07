// Pulse:

//     GET /pulses: Get all pulses.
//     GET /pulses/{id}: Get a specific pulse by ID.
//     POST /pulses: Create a new pulse.
//     PUT /pulses/{id}: Update a pulse by ID.
//     DELETE /pulses/{id}: Delete a pulse by ID.
//     GET /pulses/{id}/meter: Get the meter associated with a specific pulse.

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /pulses
export async function getAllPulses(req, res, next) {
  try {
    const pulses = await prisma.pulse.findMany();
    res.status(200).json(pulses);
  } catch (error) {
    next(error);
  }
}

// GET /pulses/:id
export async function getPulseById(req, res, next) {
  const { id } = req.params;

  try {
    const pulse = await prisma.pulse.findUnique({
      where: { id },
      include: { meter: true },
    });

    if (!pulse) {
      return res.status(404).json({ message: "Pulse record not found" });
    }

    res.status(200).json(pulse);
  } catch (error) {
    next(error);
  }
}

// POST /pulses
export async function createPulse(req, res, next) {
  const { pulseCount, meterId } = req.body;
  try {
    const pulse = await prisma.pulse.create({
      data: {
        pulseCount,
        meterId,
      },
    });
    res.status(201).json(pulse);
  } catch (error) {
    next(error);
  }
}

// PUT /pulses/:id
export async function updatePulse(req, res, next) {
  const { id } = req.params;
  const { pulseCount } = req.body;

  try {
    const pulse = await prisma.pulse.update({
      where: { id },
      data: { pulseCount },
    });

    res.status(200).json(pulse);
  } catch (error) {
    next(error);
  }
}

// DELETE /pulses/:id
export async function deletePulse(req, res, next) {
  const { id } = req.params;

  try {
    await prisma.pulse.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

// GET /pulses/:id/meter
export async function getPulseMeter(req, res, next) {
  const { id } = req.params;

  try {
    const pulse = await prisma.pulse.findUnique({
      where: { id },
      include: { meter: true },
    });

    if (!pulse) {
      return res.status(404).json({ message: "Pulse record not found" });
    }

    res.status(200).json(pulse.meter);
  } catch (error) {
    next(error);
  }
}
