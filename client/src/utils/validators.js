/**
 * Validate email address.
 */
export const isValidEmail = (email) => {
  if (!email) return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email.trim());
};

/**
 * Validate password.
 * Minimum 8 characters.
 */
export const isValidPassword = (password) => {
  return typeof password === "string" && password.length >= 8;
};

/**
 * Validate phone number.
 * Accepts Ethiopian formats:
 * 0912345678
 * +251912345678
 * 251912345678
 */
export const isValidPhone = (phone) => {
  if (!phone) return false;

  const cleanedPhone = phone.replace(/[\s-]/g, "");

  return /^(?:\+251|251|0)9\d{8}$/.test(cleanedPhone);
};

/**
 * Check required text fields.
 */
export const isRequired = (value) => {
  return typeof value === "string" && value.trim().length > 0;
};

/**
 * Validate registration form.
 */
export const validateRegister = (formData) => {
  const errors = {};

  if (!isRequired(formData.name)) {
    errors.name = "Full name is required.";
  }

  if (!isValidEmail(formData.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!isValidPassword(formData.password)) {
    errors.password = "Password must contain at least 8 characters.";
  }

  if (
    formData.confirmPassword !== undefined &&
    formData.password !== formData.confirmPassword
  ) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (formData.phone && !isValidPhone(formData.phone)) {
    errors.phone = "Please enter a valid Ethiopian phone number.";
  }

  if (!isRequired(formData.university)) {
    errors.university = "University is required.";
  }

  return errors;
};

/**
 * Validate login form.
 */
export const validateLogin = (formData) => {
  const errors = {};

  if (!isValidEmail(formData.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!isRequired(formData.password)) {
    errors.password = "Password is required.";
  }

  return errors;
};

/**
 * Validate safety report form.
 */
export const validateReport = (formData) => {
  const errors = {};

  const validCategories = [
    "harassment",
    "sexual_harassment",
    "threats",
    "blackmail",
    "retaliation",
    "discrimination",
    "violence",
    "other",
  ];

  if (!validCategories.includes(formData.category)) {
    errors.category = "Please select a valid report category.";
  }

  if (!isRequired(formData.description)) {
    errors.description = "Please describe what happened.";
  } else if (formData.description.trim().length < 10) {
    errors.description = "Description must contain at least 10 characters.";
  }

  if (!formData.incidentDate) {
    errors.incidentDate = "Incident date is required.";
  }

  if (!isRequired(formData.location)) {
    errors.location = "Incident location is required.";
  }

  return errors;
};

/**
 * Validate support request form.
 */
export const validateSupport = (formData) => {
  const errors = {};

  const validCategories = ["legal", "health", "counselling", "financial"];

  const validContactMethods = ["email", "phone"];

  if (!validCategories.includes(formData.category)) {
    errors.category = "Please select a valid support category.";
  }

  if (!isRequired(formData.description)) {
    errors.description = "Please describe the support you need.";
  }

  if (!validContactMethods.includes(formData.preferredContact)) {
    errors.preferredContact = "Please select a contact method.";
  }

  return errors;
};
