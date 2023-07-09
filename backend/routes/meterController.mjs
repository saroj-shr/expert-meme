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
      // Check if the deviceName already exists
      const existingDevice = await prisma.meter.findUnique({
        where: { deviceName: deviceName},
      });

      // Check if the deviceId already exists
      const existingDeviceId = await prisma.meter.findUnique({
        where: { hardwareId: hardwareId},
      });
  
      if (existingDevice || existingDeviceId ) {
        // Email already exists, return an error response
        return res.status(400).json({ error: 'Device already exists' });
      }
  
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
    // Check if the hardware id already exists for other tenants
  const existingMeterId = await prisma.meter.findFirst({
    where: {
      hardwareId: hardwareId,
      NOT: {
        id: {
          equals: id,
        },
      },
    },
  });

  // Check if the device name already exists for other tenants
  const existingTenantPhone = await prisma.meter.findFirst({
    where: {
      deviceName: deviceName,
      NOT: {
        id: {
          equals: id,
        },
      },
    },
  });

  if (existingMeterId) {
    // Email already exists for another tenant, return an error response
    return res.status(400).json({ error: 'Email already exists' });
  }

  if (existingTenantPhone) {
    // Phone number already exists for another tenant, return an error response
    return res.status(400).json({ error: 'Phone number already exists' });
  }
    const meter = await prisma.meter.update({
      where: { id :id},
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
