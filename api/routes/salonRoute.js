import express from "express";
import {
  createSalon,
  deleteSalon,
  getAllSalons,
  getSalon,
  updateSalon,
} from "../controllers/SalonController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get("/salon/:id", getSalon);
router.get("/salon", getAllSalons);

router.post("/salon", createSalon);

router.put("/salon/:id", verifyToken, updateSalon);

router.delete("/salon/:id", verifyToken, deleteSalon);

export default router;
