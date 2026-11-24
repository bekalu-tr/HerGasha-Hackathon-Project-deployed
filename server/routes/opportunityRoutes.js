import express from "express";

import {
  getOpportunities,
  getOpportunityById,
  createOpportunity,
} from "../controllers/opportunityController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// GET /api/opportunities
// Publicly view verified opportunities.
router.get("/", getOpportunities);

// GET /api/opportunities/:id
// View one verified opportunity.
router.get("/:id", getOpportunityById);

// POST /api/opportunities
// Organizations can submit opportunities for verification.
router.post("/", protect, authorizeRoles("organization"), createOpportunity);

export default router;
