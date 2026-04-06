import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js"; // multer middleware

const router = express.Router();

// ✅ Public routes
router.get("/", getProducts);
router.get("/:id", getProduct);

// ✅ Protected + Admin routes
// Use multer to handle image upload
router.post("/", protect, admin, upload.single("image"), createProduct);
router.put("/:id", protect, admin, upload.single("image"), updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

export default router;