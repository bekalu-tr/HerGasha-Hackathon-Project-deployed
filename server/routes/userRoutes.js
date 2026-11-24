import express from "express";

import {
  getMyProfile,
  updateMyProfile,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/users/me
// Get the logged-in user's profile.
router.get("/me", protect, getMyProfile);

// PATCH /api/users/me
// Update the logged-in user's profile.
router.patch("/me", protect, updateMyProfile);

export default router;
