
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

export default function OrganizationRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    organizationName: "",
    email: "",
    phone: "",
    registrationNumber: "",
    tradeLicenseNumber: "",
    tradeLicense: null,
    website: "",
    address: "",
    description: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle text inputs
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // Handle trade license upload
  function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a PDF, JPG, or PNG file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Trade license file must be smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    setError("");

    setFormData((previous) => ({
      ...previous,
      tradeLicense: file,
    }));
  }

  // Validate registration form
  function validateForm() {
    if (!formData.organizationName.trim()) {
      return "Organization name is required.";
    }

    if (!formData.email.trim()) {
      return "Official email is required.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      return "Phone number is required.";
    }

    if (!formData.address.trim()) {
      return "Organization address is required.";
    }

    if (!formData.tradeLicenseNumber.trim()) {
      return "Trade license number is required.";
    }

    if (!formData.tradeLicense) {
      return "Please upload your trade license document.";
    }

    if (formData.password.length < 8) {
      return "Password must contain at least 8 characters.";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }

    if (!acceptedTerms) {
      return "Please accept the terms and conditions.";
    }

    return null;
  }

  // Submit organization registration
  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const payload = new FormData();

      payload.append(
        "name",
        formData.organizationName.trim()
      );

      payload.append(
        "organizationName",
        formData.organizationName.trim()
      );

      payload.append(
        "email",
        formData.email.trim().toLowerCase()
      );

      payload.append(
        "phone",
        formData.phone.trim()
      );

      payload.append(
        "registrationNumber",
        formData.registrationNumber.trim()
      );

      payload.append(
        "tradeLicenseNumber",
        formData.tradeLicenseNumber.trim()
      );

      payload.append(
        "website",
        formData.website.trim()
      );

      payload.append(
        "address",
        formData.address.trim()
      );

      payload.append(
        "description",
        formData.description.trim()
      );

      payload.append(
        "password",
        formData.password
      );

      payload.append("role", "organization");

      payload.append(
        "tradeLicense",
        formData.tradeLicense
      );

      const response = await fetch(
        `${API_BASE_URL}/auth/register`,
        {
          method: "POST",
          body: payload,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Organization registration failed."
        );
      }

      // Ensure the backend created an organization account.
      if (data.user?.role !== "organization") {
        throw new Error(
          "The server did not create an organization account. " +
          "Please contact the administrator."
        );
      }

      // Save login information if the backend returns a token.
      if (data.token && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      setSuccess(
        "Organization registration completed successfully!"
      );

      setTimeout(() => {
        navigate(
          data.token ? "/dashboard" : "/login"
        );
      }, 1500);

    } catch (err) {
      setError(
        err.message ||
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  // Reusable input styles
  const inputClass =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-gray-700";

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 px-4 py-10">

      <div className="mx-auto max-w-3xl">

        {/* HEADER */}
        <div className="mb-8 text-center">

          <Link
            to="/"
            className="mb-5 inline-flex items-center gap-2 text-2xl font-extrabold text-emerald-700"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-white">
              H
            </span>

            Her Gasha
          </Link>

          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Register Your Organization
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Join Her Gasha as an organization and help create
            safer opportunities and stronger support networks.
          </p>

        </div>

        {/* REGISTRATION CARD */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl sm:p-10">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* ORGANIZATION INFORMATION */}
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Organization Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Tell us about your organization.
              </p>
            </div>

            {/* Organization Name */}
            <div>
              <label className={labelClass}>
                Organization Name *
              </label>

              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                placeholder="Enter organization name"
                className={inputClass}
                required
              />
            </div>

            {/* Email and Phone */}
            <div className="grid gap-5 sm:grid-cols-2">

              <div>
                <label className={labelClass}>
                  Official Email *
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="organization@example.com"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>
                  Phone Number *
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+251..."
                  className={inputClass}
                  required
                />
              </div>

            </div>

            {/* Registration Number and Website */}
            <div className="grid gap-5 sm:grid-cols-2">

              <div>
                <label className={labelClass}>
                  Registration Number
                </label>

                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  placeholder="Organization registration ID"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Website
                </label>

                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://example.org"
                  className={inputClass}
                />
              </div>

            </div>

            {/* TRADE LICENSE SECTION */}
            <div className="border-t border-gray-100 pt-6">

              <h2 className="text-xl font-bold text-gray-900">
                Trade License Verification
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Provide your organization's official trade
                license information for verification.
              </p>

            </div>

            {/* Trade License Number */}
            <div>
              <label className={labelClass}>
                Trade License Number *
              </label>

              <input
                type="text"
                name="tradeLicenseNumber"
                value={formData.tradeLicenseNumber}
                onChange={handleChange}
                placeholder="Enter your trade license number"
                className={inputClass}
                required
              />
            </div>

            {/* Trade License Document */}
            <div>

              <label className={labelClass}>
                Upload Trade License Document *
              </label>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className={inputClass}
                required
              />

              <p className="mt-2 text-xs text-gray-500">
                Accepted formats: PDF, JPG, PNG.
                Maximum size: 5 MB.
              </p>

              {formData.tradeLicense && (
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">

                  <span>📄</span>

                  <span className="font-medium">
                    {formData.tradeLicense.name}
                  </span>

                </div>
              )}

            </div>

            {/* ADDRESS */}
            <div>
              <label className={labelClass}>
                Organization Address *
              </label>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="City, region, country"
                className={inputClass}
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className={labelClass}>
                About Your Organization
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                maxLength={1000}
                placeholder="Describe your organization, its mission, and the services it provides..."
                className={inputClass}
              />

              <p className="mt-1 text-right text-xs text-gray-400">
                {formData.description.length}/1000 characters
              </p>
            </div>

            {/* ACCOUNT SECURITY */}
            <div className="border-t border-gray-100 pt-6">

              <h2 className="text-xl font-bold text-gray-900">
                Account Security
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Create a secure password for your organization account.
              </p>

            </div>

            {/* PASSWORD */}
            <div>

              <label className={labelClass}>
                Password *
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  className={`${inputClass} pr-20`}
                  minLength={8}
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-emerald-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>

            {/* CONFIRM PASSWORD */}
            <div>

              <label className={labelClass}>
                Confirm Password *
              </label>

              <div className="relative">

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Enter your password again"
                  className={`${inputClass} pr-20`}
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-emerald-700"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>

            {/* TERMS AND CONDITIONS */}
            <div className="flex items-start gap-3">

              <input
                id="terms"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) =>
                  setAcceptedTerms(event.target.checked)
                }
                className="mt-1 h-4 w-4 accent-emerald-700"
              />

              <label
                htmlFor="terms"
                className="text-sm leading-6 text-gray-600"
              >
                I confirm that the information provided is accurate
                and agree to the Her Gasha terms and conditions.
              </label>

            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {/* SUCCESS MESSAGE */}
            {success && (
              <div
                role="status"
                className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
              >
                {success}
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-xl bg-emerald-700 px-6 py-4 font-bold text-white shadow-lg transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Creating Organization Account..."
                : "Create Organization Account"}
            </button>

          </form>

          {/* LOGIN LINK */}
          <div className="mt-7 text-center text-sm text-gray-600">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-bold text-emerald-700 hover:underline"
            >
              Sign in
            </Link>

          </div>

          {/* BACK TO ROLE SELECTION */}
          <div className="mt-5 text-center">

            <Link
              to="/join"
              className="text-sm font-medium text-gray-500 hover:text-emerald-700"
            >
              ← Back to account type selection
            </Link>

          </div>

        </div>

        {/* FOOTER */}
        <p className="mt-6 text-center text-xs text-gray-500">
          Her Gasha — Empowering women through safety,
          support, and opportunity.
        </p>

      </div>
    </div>
  );
}
