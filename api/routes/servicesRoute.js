import express from "express";
import {
  createService,
  deleteService,
  getAllServices,
  getService,
  updateService,
} from "../controllers/ServicesController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get("/service/:id", getService);
router.get("/service", getAllServices);

router.post("/service", createService);

router.put("/service/:id", verifyToken, updateService);

router.delete("/service/:id", verifyToken, deleteService);

export default router;
