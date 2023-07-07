// Meter:

//     GET /meters: Get all meters.
//     GET /meters/{id}: Get a specific meter by ID.
//     POST /meters: Create a new meter.
//     PUT /meters/{id}: Update a meter by ID.
//     DELETE /meters/{id}: Delete a meter by ID.
//     GET /meters/{id}/pulse: Get the pulses associated with a specific meter.
//     GET /meters/{id}/powerConsumption: Get the power consumption records associated with a specific meter.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /meters
export async function getAllMeters(req, res, next) {
  try {
    const meters = await prisma.meter.findMany({
      where: {
        tenantId: {
          equals: null,
        },
      },
    });
    res.status(200).json(meters);
  } catch (error) {
    next(error);
  }
}

// GET /meters/:id
export async function getMeterById(req, res, next) {
  const { id } = req.params;
  try {
    const meter = await prisma.meter.findUnique({
      where: { id },
      include: {
        meterPulse: true,
        PowerConsumption: true,
      },
    });

    if (!meter) {
      return res.status(404).json({ message: "Meter not found" });
    }

    res.status(200).json(meter);
  } catch (error) {
    next(error);
  }
}

// POST /meters
export async function createMeter(req, res, next) {
  const { impkwh, hardwareId, deviceName, manufacture, status } = req.body;

  try {
    const meter = await prisma.meter.create({
      data: {
        impkwh,
        hardwareId,
        deviceName,
        manufacture,
        status,
      },
    });

    res.status(201).json(meter);
  } catch (error) {
    next(error);
  }
}

// PUT /meters/:id
export async function updateMeter(req, res, next) {
  const { id } = req.params;
  const { impkwh, hardwareId, deviceName, manufacture, status } = req.body;

  try {
    const meter = await prisma.meter.update({
      where: { id },
      data: {
        impkwh,
        hardwareId,
        deviceName,
        manufacture,
        status,
      },
    });

    res.status(200).json(meter);
  } catch (error) {
    next(error);
  }
}

// DELETE /meters/:id
export async function deleteMeter(req, res, next) {
  const { id } = req.params;

  try {
    await prisma.meter.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

// GET /meters/:id/pulse
export async function getMeterPulses(req, res, next) {
  const { id } = req.params;

  try {
    const meter = await prisma.meter.findUnique({
      where: { id },
      include: { meterPulse: true },
    });

    if (!meter) {
      return res.status(404).json({ message: "Meter not found" });
    }

    res.status(200).json(meter.meterPulse);
  } catch (error) {
    next(error);
  }
}

// GET /meters/:id/powerConsumption
export async function getMeterPowerConsumption(req, res, next) {
  const { id } = req.params;

  let perviousConsumption = 0.0;
  try {
    // get all the pulses with meter id and is_calculated is false
    const meter = await prisma.meter.findMany({
      where: { id },
      include: {
        PowerConsumption: true,
        meterPulse: {
          where: {
            is_calculated: false,
          },
        },
      },
    });
    // console.log(meter);
    const { costPerKwh } = await prisma.standardCost.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!meter) {
      return res.status(404).json({ message: "Meter not found" });
    }

    let kwh = 0.0;
    meter.forEach(async (entry) => {
      perviousConsumption = entry.PowerConsumption.consumption;
      for (const { id, pulseCount } of entry.meterPulse) {
        kwh = kwh + parseInt(pulseCount) / entry.impkwh;
        await prisma.pulse.update({
          where: {
            id,
          },
          data: {
            is_calculated: true,
          },
        });
      }
    });

    const data = await prisma.powerConsumption.upsert({
      where: {
        meterId: id,
      },
      create: {
        consumption: kwh * costPerKwh,
        meter: { connect: { id } },
      },
      update: {
        consumption: perviousConsumption + kwh * costPerKwh,
      },
    });

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

// PUT /meters/:id/status
export async function updateMetersStatus(req, res, next) {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedMeter = await prisma.meter.update({
      where: { id },
      data: { status },
    });

    res.status(200).json(updatedMeter);
  } catch (error) {
    next(error);
  }
}
