import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";

import { uploadTradeLicenseToCloudinary } from "../services/cloudinaryService.js";

// ==========================================
// GENERATE JWT
// ==========================================
const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// ==========================================
// REGISTER STUDENT OR ORGANIZATION
// ==========================================
export const registerUser = async (req, res, next) => {
  let uploadedDocument = null;

  try {
    const {
      name,
      organizationName,
      email,
      password,
      phone,
      registrationNumber,
      tradeLicenseNumber,
      website,
      address,
      description,
      role,
    } = req.body;

    const accountRole = role || "student";

    // Validate role.
    if (!["student", "organization"].includes(accountRole)) {
      return res.status(400).json({
        success: false,
        message: "Invalid registration role",
      });
    }

    // Validate email and password.
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // Validate organization information.
    if (accountRole === "organization") {
      if (!organizationName || !phone || !tradeLicenseNumber || !address) {
        return res.status(400).json({
          success: false,
          message: "Please complete all required organization fields",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please upload your trade license",
        });
      }
    } else if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    // Normalize email.
    const normalizedEmail = email.trim().toLowerCase();

    // Check duplicate email.
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    // Upload organization trade license.
    if (accountRole === "organization") {
      uploadedDocument = await uploadTradeLicenseToCloudinary(req.file);

      if (!uploadedDocument?.publicId) {
        throw new Error("Trade license upload failed");
      }
    }

    // Prepare account data.
    const userData = {
      name:
        accountRole === "organization" ? organizationName.trim() : name.trim(),

      email: normalizedEmail,
      password,
      role: accountRole,
      phone: phone?.trim() || "",
    };

    // Add organization details.
    if (accountRole === "organization") {
      userData.organizationName = organizationName.trim();

      userData.registrationNumber = registrationNumber?.trim() || "";

      userData.tradeLicenseNumber = tradeLicenseNumber.trim();

      userData.website = website?.trim() || "";
      userData.address = address.trim();
      userData.description = description?.trim() || "";

      userData.tradeLicense = {
        url:
          uploadedDocument.url ||
          uploadedDocument.secureUrl ||
          uploadedDocument.secure_url ||
          "",

        publicId: uploadedDocument.publicId,

        originalName: uploadedDocument.originalName || req.file.originalname,

        mimeType: uploadedDocument.mimeType || req.file.mimetype,

        size: uploadedDocument.size || req.file.size,
      };

      // DEVELOPMENT MODE:
      // Automatically approve organizations because
      // administrator approval is not implemented yet.
      userData.organizationVerificationStatus = "approved";
      userData.isVerified = true;
    }

    // Create MongoDB account.
    const user = await User.create(userData);

    // Generate token for both account types.
    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,

      message:
        accountRole === "organization"
          ? "Organization registered successfully. You can now log in."
          : "Registration successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organizationVerificationStatus: user.organizationVerificationStatus,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    // Delete uploaded document if registration fails.
    if (uploadedDocument?.publicId) {
      try {
        await cloudinary.uploader.destroy(uploadedDocument.publicId, {
          resource_type: "raw",
          type: "authenticated",
        });
      } catch (cleanupError) {
        console.error("Cloudinary cleanup failed:", cleanupError.message);
      }
    }

    next(error);
  }
};

// ==========================================
// LOGIN
// ==========================================
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find account.
    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check active account.
    if (user.isActive !== true) {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive",
      });
    }

    // Verify password.
    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate token.
    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organizationVerificationStatus: user.organizationVerificationStatus,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET CURRENT USER
// ==========================================
export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
