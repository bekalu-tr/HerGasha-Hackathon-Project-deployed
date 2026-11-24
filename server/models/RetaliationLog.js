import mongoose from "mongoose";

const retaliationLogSchema = new mongoose.Schema(
  {
    report: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
      required: true,
      index: true,
    },

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    incidentType: {
      type: String,
      enum: [
        "grade_change",
        "threat",
        "intimidation",
        "academic_punishment",
        "discrimination",
        "pressure_to_withdraw",
        "other",
      ],
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },

    incidentDate: {
      type: Date,
      default: null,
    },

    location: {
      type: String,
      trim: true,
      maxlength: 200,
      default: "",
    },

    evidence: [
      {
        fileName: {
          type: String,
          default: "",
        },

        publicId: {
          type: String,
          default: "",
        },

        mimeType: {
          type: String,
          default: "",
        },
      },
    ],

    status: {
      type: String,
      enum: ["submitted", "under_review", "action_required", "resolved"],
      default: "submitted",
    },

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    reviewNotes: {
      type: String,
      maxlength: 3000,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

retaliationLogSchema.index({ report: 1, createdAt: -1 });

const RetaliationLog = mongoose.model("RetaliationLog", retaliationLogSchema);

export default RetaliationLog;
