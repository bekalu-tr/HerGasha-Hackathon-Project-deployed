import mongoose from "mongoose";

const caseAssignmentSchema = new mongoose.Schema(
  {
    report: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
      required: true,
      index: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignmentType: {
      type: String,
      enum: [
        "primary_handler",
        "legal_advisor",
        "support_coordinator",
        "reviewer",
      ],
      default: "primary_handler",
    },

    status: {
      type: String,
      enum: [
        "assigned",
        "accepted",
        "in_progress",
        "completed",
        "rejected",
        "reassigned",
      ],
      default: "assigned",
    },

    assignedAt: {
      type: Date,
      default: Date.now,
    },

    acceptedAt: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },

    dueDate: {
      type: Date,
      default: null,
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

caseAssignmentSchema.index({
  assignedTo: 1,
  status: 1,
});

caseAssignmentSchema.index({
  report: 1,
  assignedAt: -1,
});

const CaseAssignment = mongoose.model("CaseAssignment", caseAssignmentSchema);

export default CaseAssignment;
