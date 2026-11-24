export const sendEmailNotification = async ({ to, subject, message }) => {
  if (!to || !subject || !message) {
    throw new Error("Recipient, subject and message are required");
  }

  // Development placeholder.
  console.log("EMAIL NOTIFICATION");
  console.log("To:", to);
  console.log("Subject:", subject);
  console.log("Message:", message);

  return {
    success: true,
    message: "Email notification prepared",
  };
};

export const sendSMSNotification = async ({ phone, message }) => {
  if (!phone || !message) {
    throw new Error("Phone number and message are required");
  }

  // Development placeholder.
  console.log("SMS NOTIFICATION");
  console.log("Phone:", phone);
  console.log("Message:", message);

  return {
    success: true,
    message: "SMS notification prepared",
  };
};

// Notify a student when their report status changes.
export const notifyReportStatus = async (user, report) => {
  if (!user?.email || !report?.status) {
    throw new Error("Valid user and report information are required");
  }

  return await sendEmailNotification({
    to: user.email,
    subject: "Her Gasha - Report Status Update",
    message: `Your report status has been updated to: ${report.status}`,
  });
};
