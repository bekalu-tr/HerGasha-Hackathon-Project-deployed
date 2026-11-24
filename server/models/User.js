import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    // ======================================
    // BASIC ACCOUNT INFORMATION
    // ======================================
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false,
    },

    // ======================================
    // ACCOUNT ROLE
    // ======================================
    role: {
      type: String,
      enum: [
        "student",
        "legal_advisor",
        "organization",
        "verifier",
        "super_admin",
      ],
      default: "student",
      required: true,
    },

    // ======================================
    // STUDENT INFORMATION
    // ======================================
    university: {
      type: String,
      trim: true,
      maxlength: 150,
      default: "",
    },

    // ======================================
    // SHARED CONTACT INFORMATION
    // ======================================
    phone: {
      type: String,
      trim: true,
      maxlength: 25,
      default: "",
    },

    // ======================================
    // ORGANIZATION INFORMATION
    // ======================================
    organizationName: {
      type: String,
      trim: true,
      maxlength: 200,
      default: "",
    },

    registrationNumber: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },

    tradeLicenseNumber: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },

    website: {
      type: String,
      trim: true,
      maxlength: 255,
      default: "",
    },

    address: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    description: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },

    // ======================================
    // TRADE LICENSE DOCUMENT
    // ======================================
    tradeLicense: {
      url: {
        type: String,
        default: "",
      },

      publicId: {
        type: String,
        default: "",
      },

      originalName: {
        type: String,
        default: "",
      },

      mimeType: {
        type: String,
        default: "",
      },

      size: {
        type: Number,
        default: 0,
      },
    },

    // ======================================
    // ORGANIZATION VERIFICATION
    // ======================================
    organizationVerificationStatus: {
      type: String,
      enum: ["not_applicable", "pending", "approved", "rejected"],
      default: "not_applicable",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    // ======================================
    // ACCOUNT STATUS
    // ======================================
    isActive: {
      type: Boolean,
      default: true,
    },

    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

// ==========================================
// HASH PASSWORD BEFORE SAVING
// ==========================================
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 12);
});

// ==========================================
// COMPARE PASSWORD
// ==========================================
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// ==========================================
// CREATE MODEL
// ==========================================
const User = mongoose.model("User", userSchema);

export default User;
