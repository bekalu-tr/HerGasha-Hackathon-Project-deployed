import express from "express";

import {
  createSupportRequest,
  getMySupportRequests,
  getSupportRequestById,
} from "../controllers/supportController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Submit a support request.
router.post("/", protect, createSupportRequest);

// Get all support requests belonging to the logged-in user.
router.get("/", protect, getMySupportRequests);

// Get one support request belonging to the logged-in user.
router.get("/:id", protect, getSupportRequestById);

export default router;
