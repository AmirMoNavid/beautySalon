import express from "express";
import {
  createEdcService,
  deleteEdcService,
  getAllEdcServices,
  getEdcService,
  updateEdcService,
} from "../controllers/EdcServicesController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get("/edcService/:id", getEdcService);
router.get("/edcService", getAllEdcServices);

router.post("/edcService", createEdcService);

router.put("/edcService/:id", verifyToken, updateEdcService);

router.delete("/edcService/:id", verifyToken, deleteEdcService);

export default router;
