import express from "express";
import {
  createNumber,
  deleteNumber,
  getAllNumbers,
  getNumber,
  updateNumber,
} from "../controllers/NumberController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get("/number/:id", getNumber);
router.get("/number", getAllNumbers);

router.post("/number", createNumber);

router.put("/number/:id", verifyToken, updateNumber);

router.delete("/number/:id", verifyToken, deleteNumber);

export default router;
