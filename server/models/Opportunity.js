import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Opportunity title is required"],
      trim: true,
      maxlength: 150,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: 10000,
    },

    type: {
      type: String,
      required: true,
      enum: ["job", "internship", "part_time", "short_term", "freelance"],
    },

    organization: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    location: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    deadline: {
      type: Date,
      default: null,
    },

    applicationLink: {
      type: String,
      trim: true,
      default: "",
      maxlength: 2048,
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "verified", "rejected", "expired"],
      default: "pending",
      index: true,
    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    verifiedAt: {
      type: Date,
      default: null,
    },
  },

  {
    timestamps: true,
  },
);

// Search verified opportunities
opportunitySchema.index({
  status: 1,
  type: 1,
  createdAt: -1,
});

const Opportunity = mongoose.model("Opportunity", opportunitySchema);

export default Opportunity;
