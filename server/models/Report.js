import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    // Student who submitted the report
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    category: {
      type: String,
      required: [true, "Report category is required"],
      enum: [
        "harassment",
        "sexual_harassment",
        "threats",
        "blackmail",
        "retaliation",
        "discrimination",
        "violence",
        "other",
      ],
    },

    description: {
      type: String,
      required: [true, "Report description is required"],
      minlength: 20,
      maxlength: 10000,
    },

    incidentDate: {
      type: Date,
      default: null,
    },

    location: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },

    // Display preference, not true anonymity
    anonymous: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: [
        "submitted",
        "under_review",
        "assigned",
        "in_progress",
        "resolved",
        "closed",
      ],
      default: "submitted",
    },

    // Advisor assigned to this report
    assignedAdvisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Explicitly authorized users who can access this report
    sharedWith: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // References to private evidence storage
    evidence: [
      {
        storageKey: {
          type: String,
          required: true,
        },

        originalName: {
          type: String,
          maxlength: 255,
        },

        mimeType: {
          type: String,
        },

        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },

  {
    timestamps: true,
  },
);

// Useful for retrieving a student's reports
reportSchema.index({
  submittedBy: 1,
  createdAt: -1,
});

// Useful for advisor report assignments
reportSchema.index({
  assignedAdvisor: 1,
  status: 1,
});

const Report = mongoose.model("Report", reportSchema);

export default Report;
