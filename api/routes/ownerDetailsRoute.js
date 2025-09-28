import express from "express";
import {
  createDetail,
  deleteDetail,
  getDetail,
  updateDetail,
} from "../controllers/OwnerDetailsController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get("/ownerDetail/:id", getDetail);
// router.get("/ownerDetail", getAllDetails);

router.post("/ownerDetail", createDetail);

router.put("/ownerDetail/:id", verifyToken, updateDetail);

router.delete("/ownerDetail/:id", verifyToken, deleteDetail);

export default router;
