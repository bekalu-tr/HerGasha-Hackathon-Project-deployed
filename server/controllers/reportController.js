import Report from "../models/Report.js";

// SUBMIT A REPORT
export const createReport = async (req, res, next) => {
  try {
    const { category, description, incidentDate, location, anonymous } =
      req.body;

    if (!category || !description) {
      return res.status(400).json({
        success: false,
        message: "Category and description are required",
      });
    }

    if (description.trim().length < 20) {
      return res.status(400).json({
        success: false,
        message: "Please provide more details about the incident",
      });
    }

    const report = await Report.create({
      submittedBy: req.user.id,
      category,
      description: description.trim(),
      incidentDate: incidentDate || null,
      location: location?.trim() || "",
      anonymous: anonymous === true,
      status: "submitted",
    });

    return res.status(201).json({
      success: true,
      message: "Your report has been submitted successfully",
      report: {
        id: report._id,
        category: report.category,
        status: report.status,
        createdAt: report.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL REPORTS BELONGING TO CURRENT USER
export const getMyReports = async (req, res, next) => {
  try {
    const reports = await Report.find({
      submittedBy: req.user.id,
    })
      .select("-description")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (error) {
    next(error);
  }
};

// GET ONE REPORT
export const getReportById = async (req, res, next) => {
  try {
    const report = await Report.findOne({
      _id: req.params.id,
      submittedBy: req.user.id,
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    return res.status(200).json({
      success: true,
      report,
    });
  } catch (error) {
    next(error);
  }
};
