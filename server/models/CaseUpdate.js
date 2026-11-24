import mongoose from "mongoose";

const caseUpdateSchema = new mongoose.Schema(
  {
    report: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
      required: true,
      index: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    updateType: {
      type: String,
      enum: [
        "status_change",
        "message",
        "information_request",
        "legal_guidance",
        "referral",
        "general",
      ],
      default: "general",
      required: true,
    },

    previousStatus: {
      type: String,
      default: "",
    },

    newStatus: {
      type: String,
      default: "",
    },

    message: {
      type: String,
      trim: true,
      maxlength: 3000,
      required: true,
    },

    isConfidential: {
      type: Boolean,
      default: true,
    },

    visibleToReporter: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

caseUpdateSchema.index({ report: 1, createdAt: -1 });

const CaseUpdate = mongoose.model("CaseUpdate", caseUpdateSchema);

export default CaseUpdate;
