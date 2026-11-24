import User from "../models/User.js";

// GET MY PROFILE
export const getMyProfile = async (req, res, next) => {
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

// UPDATE MY PROFILE
export const updateMyProfile = async (req, res, next) => {
  try {
    const { name, university, phone } = req.body;

    const updates = {};

    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Name cannot be empty",
        });
      }

      updates.name = name.trim();
    }

    if (university !== undefined) {
      updates.university = university.trim();
    }

    if (phone !== undefined) {
      updates.phone = phone.trim();
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid profile information provided",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};
