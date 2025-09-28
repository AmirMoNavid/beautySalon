import express from "express";
import {
  createGallery,
  deleteGallery,
  getAllGallerys,
  getGallery,
  updateGallery,
} from "../controllers/GalleryController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get("/gallery/:id", getGallery);
router.get("/gallery", getAllGallerys);

router.post("/gallery", createGallery);

router.put("/gallery/:id", verifyToken, updateGallery);

router.delete("/gallery/:id", verifyToken, deleteGallery);

export default router;
