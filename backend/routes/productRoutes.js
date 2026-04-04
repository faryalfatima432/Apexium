
import express from "express";
import { getProducts, createProduct } from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Public route
router.get("/", getProducts);

// ✅ Protected + Admin route
router.post("/", protect, admin, createProduct);

export default router;

