import express from "express";
import {
  createReserve,
  deleteReserve,
  getReserve,
  getAllReserves,
  getAvailableReserveTimes,
} from "../controllers/ReserveController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get("/reserve/:id", getReserve);
router.get("/reserve", getAllReserves);

router.post("/reserve", createReserve);

// router.put("/reserve/:id", verifyToken, updateReserve);

router.get("/available", getAvailableReserveTimes);

router.delete("/reserve/:id", verifyToken, deleteReserve);

export default router;
