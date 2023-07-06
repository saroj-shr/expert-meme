import { Router } from "express";
import {
  getAllMeters,
  getMeterById,
  createMeter,
  updateMeter,
  deleteMeter,
  getMeterPulses,
  getMeterPowerConsumption,
  updateMetersStatus,
} from "./meterController.mjs";
import {
  getAllPowerConsumptions,
  getPowerConsumptionById,
  createPowerConsumption,
  updatePowerConsumption,
  deletePowerConsumption,
  getPowerConsumptionMeter,
} from "./powerConsumptionController.mjs";
import {
  getAllPulses,
  getPulseById,
  createPulse,
  updatePulse,
  deletePulse,
  getPulseMeter,
} from "./pulseController.mjs";
import {
  getAllTenants,
  getTenantById,
  createTenant,
  updateTenant,
  deleteTenant,
  getTenantAssignedMeter,
  updateTenantStatus,
  putTenantAssignedMeter,
  deleteTenantAssignedMeter,
} from "./tenantController.mjs";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
} from "./usersController.mjs";
import { Home } from "./homeController.mjs";

//middleware
import { Authenticate } from "../middleware/authenticate.js";

const router = Router();

/* GET home page. */
router.get("/home", Authenticate, Home);
// router.get("/", function (_req, res, _next) {
//   res.status(200).json({
//     message: "index",
//   });
// });

// Meter routes
router.get("/meters", getAllMeters);
router.get("/meters/:id", getMeterById);
router.post("/meters", createMeter);
router.put("/meters/:id", updateMeter);
router.delete("/meters/:id", deleteMeter);
router.get("/meters/:id/pulse", getMeterPulses);
router.get("/meters/:id/powerConsumption", getMeterPowerConsumption);
router.put("/meters/:id/status", updateMetersStatus);

// Power Consumption routes
router.get("/powerConsumptions", getAllPowerConsumptions);
router.get("/powerConsumptions/:id", getPowerConsumptionById);
router.post("/powerConsumptions", createPowerConsumption);
router.put("/powerConsumptions/:id", updatePowerConsumption);
router.delete("/powerConsumptions/:id", deletePowerConsumption);
router.get("/powerConsumptions/:id/meter", getPowerConsumptionMeter);

// Pulse routes
router.get("/pulses", getAllPulses);
router.get("/pulses/:id", getPulseById);
router.post("/pulses", createPulse);
// router.put("/pulses/:id", updatePulse);
// router.delete("/pulses/:id", deletePulse);
router.get("/pulses/:id/meter", getPulseMeter);

// Tenant routes
router.get("/tenants", getAllTenants);
router.get("/tenants/:id", getTenantById);
router.post("/tenants", createTenant);
router.put("/tenants/:id", updateTenant);
router.delete("/tenants/:id", deleteTenant);
router.get("/tenants/:id/assignedMeter", getTenantAssignedMeter);
router.put("/tenants/:id/assignedMeter/:meterId", putTenantAssignedMeter);
router.delete("/tenants/:id/assignedMeter/:meterId", deleteTenantAssignedMeter);
router.put("/tenants/:id/status", updateTenantStatus);

// User routes
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.post("/login", login);

export default router;
