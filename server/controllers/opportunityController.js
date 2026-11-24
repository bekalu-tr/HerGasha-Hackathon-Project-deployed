import Opportunity from "../models/Opportunity.js";

// GET ALL VERIFIED OPPORTUNITIES
export const getOpportunities = async (req, res, next) => {
  try {
    const { type, search } = req.query;

    const filter = {
      status: "verified",
    };

    if (type) {
      filter.type = type;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    const opportunities = await Opportunity.find(filter)
      .sort({ createdAt: -1 })
      .limit(50);

    return res.status(200).json({
      success: true,
      count: opportunities.length,
      opportunities,
    });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE OPPORTUNITY
export const getOpportunityById = async (req, res, next) => {
  try {
    const opportunity = await Opportunity.findOne({
      _id: req.params.id,
      status: "verified",
    });

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: "Opportunity not found",
      });
    }

    return res.status(200).json({
      success: true,
      opportunity,
    });
  } catch (error) {
    next(error);
  }
};

// CREATE OPPORTUNITY
export const createOpportunity = async (req, res, next) => {
  try {
    const {
      title,
      description,
      type,
      organization,
      location,
      deadline,
      applicationLink,
    } = req.body;

    if (!title || !description || !type || !organization || !location) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required opportunity details",
      });
    }

    const opportunity = await Opportunity.create({
      title: title.trim(),
      description: description.trim(),
      type,
      organization: organization.trim(),
      location: location.trim(),
      deadline: deadline || null,
      applicationLink: applicationLink || "",
      postedBy: req.user.id,
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      message: "Opportunity submitted for verification",
      opportunity,
    });
  } catch (error) {
    next(error);
  }
};
