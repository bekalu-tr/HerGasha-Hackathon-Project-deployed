import mongoose from "mongoose";

const caseAccessSchema = new mongoose.Schema(
  {
    report: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
      required: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    accessType: {
      type: String,
      enum: [
        "case_handler",
        "legal_advisor",
        "support_coordinator",
        "admin_reviewer",
      ],
      required: true,
    },

    permission: {
      type: String,
      enum: ["read", "update", "manage"],
      default: "read",
    },

    grantedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    consentGranted: {
      type: Boolean,
      default: false,
    },

    consentPurpose: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    consentGrantedAt: {
      type: Date,
      default: null,
    },

    consentRevokedAt: {
      type: Date,
      default: null,
    },

    expiresAt: {
      type: Date,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

caseAccessSchema.index({
  report: 1,
  user: 1,
  isActive: 1,
});

const CaseAccess = mongoose.model("CaseAccess", caseAccessSchema);

export default CaseAccess;
