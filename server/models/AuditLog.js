import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    action: {
      type: String,
      enum: [
        "report_created",
        "report_viewed",
        "report_updated",
        "report_deleted",
        "case_assigned",
        "case_reassigned",
        "status_changed",
        "evidence_uploaded",
        "evidence_accessed",
        "consent_granted",
        "consent_revoked",
        "retaliation_reported",
        "document_shared",
        "login",
        "failed_login",
        "user_verified",
        "user_suspended",
        "other",
      ],
      required: true,
    },

    resourceType: {
      type: String,
      enum: [
        "report",
        "user",
        "case_update",
        "case_assignment",
        "case_access",
        "retaliation_log",
        "document",
        "system",
      ],
      required: true,
    },

    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    ipAddress: {
      type: String,
      maxlength: 100,
      default: "",
    },

    userAgent: {
      type: String,
      maxlength: 500,
      default: "",
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    success: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

auditLogSchema.index({
  resourceType: 1,
  resourceId: 1,
  createdAt: -1,
});

auditLogSchema.index({
  performedBy: 1,
  createdAt: -1,
});

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

export default AuditLog;
