// Tenant :

//     GET /tenants: Get all tenants.
//     GET /tenants/{id}: Get a specific tenant by ID.
//     POST /tenants: Create a new tenant.
//     PUT /tenants/{id}: Update a tenant by ID.
//     DELETE /tenants/{id}: Delete a tenant by ID.
//     GET /tenants/{id}/assignedMeter: Get the meters assigned to a specific tenant.
//     PUT /tenants/{id}/assignedMeter/{id} : Add the meters assigned to a specific tenant.
//     DELETE /tenants/{id}/assignedMeter/{id} : Add the meters assigned to a specific tenant.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /tenants
export async function getAllTenants(req, res, next) {
  try {
    const tenants = await prisma.tenant.findMany({
      include: {
        assignedMeter: true,
      },
    });
    res.status(200).json(tenants);
  } catch (error) {
    next(error);
  }
}

// GET /tenants/:id
export async function getTenantById(req, res, next) {
  const { id } = req.params;

  try {
    const tenant = await prisma.tenant.findUnique({
      where: { id },
      include: {
        assignedMeter: true,
      },
    });

    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    res.status(200).json(tenant);
  } catch (error) {
    next(error);
  }
}

// POST /tenants
export async function createTenant(req, res, next) {
  const { firstName, lastName, email, phoneNumber, status } = req.body;

  try {
    const tenant = await prisma.tenant.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        status,
      },
    });

    res.status(201).json(tenant);
  } catch (error) {
    next(error);
  }
}

// PUT /tenants/:id
export async function updateTenant(req, res, next) {
  const { id } = req.params;
  const { firstName, lastName, email, status, phoneNumber } = req.body;

  try {
    const tenant = await prisma.tenant.update({
      where: { id },
      data: { firstName, lastName, email, status, phoneNumber },
    });

    res.status(200).json(tenant);
  } catch (error) {
    next(error);
  }
}

// DELETE /tenants/:id
export async function deleteTenant(req, res, next) {
  const { id } = req.params;

  try {
    await prisma.tenant.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

// GET /tenants/:id/meters
export async function getTenantAssignedMeter(req, res, next) {
  const { id } = req.params;

  try {
    const tenant = await prisma.tenant.findUnique({
      where: { id },
      include: { assignedMeter: true },
    });

    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    res.status(200).json(tenant.assignedMeter);
  } catch (error) {
    next(error);
  }
}

//     PUT /tenants/{id}/assignedMeter/{id} : Add the meters assigned to a specific tenant.
export async function putTenantAssignedMeter(req, res, next) {
  const { id, meterId } = req.params;

  try {
    const meter = await prisma.meter.findFirst({
      where: { meterPulse },
    });

    if (!meter) {
      return res.status(404).json({ message: "Meter not found" });
    }

    if (meter.status == false) {
      return res.status(404).json({ message: "Meter is not status is false" });
    }

    if (meter.tenantId) {
      return res.status(404).json({ message: "Meter is assigned " });
    }

    const tenant = await prisma.tenant.update({
      where: { id },
      data: {
        assignedMeter: {
          set: {
            id: meterId,
          },
        },
      },
      include: {
        assignedMeter: true,
      },
    });

    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }
    res.status(200).json(tenant);
  } catch (error) {
    next(error);
  }
}

//     DELETE /tenants/{id}/assignedMeter/{id} : Add the meters assigned to a specific tenant.
export async function deleteTenantAssignedMeter(req, res, next) {
  const { id, meterId } = req.params;

  try {
    const tenant = await prisma.tenant.findUnique({
      where: { id },
      include: { assignedMeter: true },
    });

    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    const meterIndex = tenant.assignedMeter.findIndex(
      (meter) => meter.id === meterId
    );

    if (meterIndex === -1) {
      return res.status(404).json({ message: "Meter not found" });
    }

    const updatedAssignedMeter = [...tenant.assignedMeter];
    updatedAssignedMeter.splice(meterIndex, 1);

    const updatedTenant = await prisma.tenant.update({
      where: { id },
      data: {
        assignedMeter: {
          set: updatedAssignedMeter,
        },
      },
      include: { assignedMeter: true },
    });

    res.status(200).json(updatedTenant);
  } catch (error) {
    next(error);
  }
}

// PUT /tenants/:id/status
export async function updateTenantStatus(req, res, next) {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedTenant = await prisma.tenant.update({
      where: { id },
      data: { status },
    });

    res.status(200).json(updatedTenant);
  } catch (error) {
    next(error);
  }
}
