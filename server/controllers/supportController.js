import SupportRequest from "../models/SupportRequest.js";

// CREATE SUPPORT REQUEST
export const createSupportRequest = async (req, res, next) => {
  try {
    const { category, description, preferredContact } = req.body;

    const allowedCategories = ["legal", "health", "counselling", "financial"];

    if (!category || !description) {
      return res.status(400).json({
        success: false,
        message: "Category and description are required",
      });
    }

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid support category",
      });
    }

    if (
      typeof description !== "string" ||
      description.trim().length < 10 ||
      description.trim().length > 5000
    ) {
      return res.status(400).json({
        success: false,
        message: "Description must contain between 10 and 5000 characters",
      });
    }

    if (preferredContact && !["email", "phone"].includes(preferredContact)) {
      return res.status(400).json({
        success: false,
        message: "Invalid preferred contact method",
      });
    }

    const request = await SupportRequest.create({
      requestedBy: req.user.id,
      category,
      description: description.trim(),
      preferredContact: preferredContact || "email",
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      message: "Your support request was submitted successfully",
      request: {
        _id: request._id,
        category: request.category,
        status: request.status,
        preferredContact: request.preferredContact,
        createdAt: request.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET MY SUPPORT REQUESTS
export const getMySupportRequests = async (req, res, next) => {
  try {
    const requests = await SupportRequest.find({
      requestedBy: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    next(error);
  }
};

// GET ONE SUPPORT REQUEST
export const getSupportRequestById = async (req, res, next) => {
  try {
    const request = await SupportRequest.findOne({
      _id: req.params.id,
      requestedBy: req.user.id,
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Support request not found",
      });
    }

    return res.status(200).json({
      success: true,
      request,
    });
  } catch (error) {
    next(error);
  }
};
