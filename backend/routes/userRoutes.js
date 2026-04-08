import express from "express";
import { registerUser, loginUser, getUsers, updateUserStatus, deleteUser, updateUserToAdmin } from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.get('/logout', logoutUser)
router.get("/", protect, admin, getUsers);
router.put("/:id/status", protect, admin, updateUserStatus);
router.put("/:id/admin", protect, updateUserToAdmin);
router.delete("/:id", protect, admin, deleteUser);

export default router;