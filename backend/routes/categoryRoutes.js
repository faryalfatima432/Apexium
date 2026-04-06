// // routes/categoryRoutes.js
// import express from 'express';
// import { getCategories, getCategory, createCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';
// import { protect, admin } from '../middleware/authMiddleware.js';

// const router = express.Router();

// router.get('/', protect, admin, getCategories);
// router.get('/:id', protect, admin, getCategory);
// router.post('/', protect, admin, createCategory);
// router.put('/:id', protect, admin, updateCategory);
// router.delete('/:id', protect, admin, deleteCategory);

// export default router;

import express from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../controllers/categoryController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", protect, admin, createCategory);
router.put("/:id", protect, admin, updateCategory);
router.delete("/:id", protect, admin, deleteCategory);

export default router;