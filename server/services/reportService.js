import Report from "../models/Report.js";

// Create a new confidential report.
export const submitReport = async (reportData) => {
  const report = await Report.create(reportData);

  return report;
};

// Get reports submitted by a particular student.
export const findReportsByUser = async (userId) => {
  return await Report.find({
    submittedBy: userId,
  })
    .select("-description -evidence")
    .sort({ createdAt: -1 });
};

// Find one report belonging to its owner.
export const findReportById = async (reportId, userId) => {
  return await Report.findOne({
    _id: reportId,
    submittedBy: userId,
  }).select("-evidence");
};

// Update a report's status.
// Only call this from a properly authorized workflow.
export const updateReportStatus = async (reportId, status) => {
  return await Report.findByIdAndUpdate(
    reportId,
    { status },
    {
      new: true,
      runValidators: true,
    },
  );
};
