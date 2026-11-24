import express from "express";

import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

import { uploadTradeLicense } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// POST /api/auth/register
// Supports student JSON registration and organization multipart registration.
router.post("/register", uploadTradeLicense, registerUser);

// POST /api/auth/login
router.post("/login", loginUser);

// GET /api/auth/me
// Only logged-in users can access this route.
router.get("/me", protect, getCurrentUser);

export default router;
