import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryBySlug,
  getCategoryById,
  updateCategory,
} from "../controllers/CategoryController.js";
const router = express.Router();

router.get("/category", getAllCategories);
router.get("/category/:id", getCategoryById);
router.get("/category/slug/:slug", getCategoryBySlug);

router.post("/category", verifyToken, createCategory);
router.put("/category/:id", verifyToken, updateCategory);
router.delete("/category/:id", verifyToken, deleteCategory);

export default router;
