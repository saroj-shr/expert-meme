// Tenant :

//     GET /tenants: Get all tenants.
//     GET /tenants/{id}: Get a specific tenant by ID.
//     POST /tenants: Create a new tenant.
//     PUT /tenants/{id}: Update a tenant by ID.
//     DELETE /tenants/{id}: Delete a tenant by ID.
//     GET /tenants/{id}/assignedMeter: Get the meters assigned to a specific tenant.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /tenants
export async function getAllTenants(req, res, next) {
  try {
    const tenants = await prisma.tenant.findMany();
    res.status(200).json(tenants);
  } catch (error) {
    next(error);
  }
}

// GET /tenants/:id
export async function getTenantById(req, res, next) {
  const { id } = req.params;

  try {
    const tenant = await prisma.tenant.findUnique({ where: { id } });

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
  const { firstName, lastName, email, phoneNumber } = req.body;

  try {
    const tenant = await prisma.tenant.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
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
  const { firstName, lastName, email, phoneNumber } = req.body;

  try {
    const tenant = await prisma.tenant.update({
      where: { id },
      data: { firstName, lastName, email, phoneNumber },
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
