import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { authenticateToken } from "../controllers/authController.js";
import { upload } from "../config/upload.js";

const router = express.Router();


router.use(authenticateToken);


router.post("/categories", upload.single("coverImage"), createCategory);
router.get("/getcategories", getCategories);
router.get("/categories/:id", getCategoryById);
router.put("/categories/:id", upload.single("coverImage"), updateCategory);
router.delete("/categories/:id", deleteCategory);

export default router;
