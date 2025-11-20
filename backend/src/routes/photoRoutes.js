import express from "express";
import { upload } from "../config/upload.js";
import {
  createPhoto,
  getPhotos,
  updatePhotoDescription,
  deletePhoto,
  getAllPhotos,
} from "../controllers/photoController.js";
import { authenticateToken } from "../controllers/authController.js";

const router = express.Router();

router.use(authenticateToken);

// Fotos por categoria
router.get("/categories/:categoryId/photos", getPhotos);
router.post("/categories/:categoryId/photos", upload.single("photo"), createPhoto);
router.patch("/categories/:categoryId/photos/:photoId/description", updatePhotoDescription);
router.delete("/categories/:categoryId/photos/:photoId", deletePhoto);

// Fotos globais
router.get("/photos", getAllPhotos);
router.patch("/photos/:photoId", updatePhotoDescription);
router.delete("/photos/:photoId", deletePhoto);

export default router;
