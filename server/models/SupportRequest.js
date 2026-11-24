import mongoose from "mongoose";

const supportRequestSchema = new mongoose.Schema(
  {
    // Student requesting assistance
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["legal", "health", "counselling", "financial"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: 10,
      maxlength: 5000,
    },

    preferredContact: {
      type: String,
      enum: ["email", "phone"],
      default: "email",
    },

    status: {
      type: String,
      enum: ["pending", "assigned", "in_progress", "fulfilled", "closed"],
      default: "pending",
    },

    // Organization or professional handling the request
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    assignedAt: {
      type: Date,
      default: null,
    },

    resolvedAt: {
      type: Date,
      default: null,
    },
  },

  {
    timestamps: true,
  },
);

// Retrieve a student's support requests
supportRequestSchema.index({
  requestedBy: 1,
  createdAt: -1,
});

// Retrieve requests assigned to an organization or advisor
supportRequestSchema.index({
  assignedTo: 1,
  status: 1,
});

const SupportRequest = mongoose.model("SupportRequest", supportRequestSchema);

export default SupportRequest;
