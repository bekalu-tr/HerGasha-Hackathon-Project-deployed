import express from "express";

import {
  createReport,
  getMyReports,
  getReportById,
} from "../controllers/reportController.js";

import { protect } from "../middleware/authMiddleware.js";
import { uploadEvidence } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// All report routes require authentication.

// POST /api/reports
// Submit a new report.
router.post("/", protect, uploadEvidence, createReport);

// GET /api/reports
// Get reports submitted by the logged-in user.
router.get("/", protect, getMyReports);

// GET /api/reports/:id
// Get one report belonging to the logged-in user.
router.get("/:id", protect, getReportById);

export default router;
