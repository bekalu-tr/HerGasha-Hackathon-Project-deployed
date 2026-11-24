
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth.js";

import {
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  FileText,
  LockKeyhole,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Upload,
} from "lucide-react";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

export default function OrganizationRegister() {
  const navigate = useNavigate();
  const { setSession } = useAuth();

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
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

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

    setError("");
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
      setFormData((previous) => ({
        ...previous,
        tradeLicense: null,
      }));
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Trade license file must be smaller than 5 MB.");
      setFormData((previous) => ({
        ...previous,
        tradeLicense: null,
      }));
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

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
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

      payload.append("phone", formData.phone.trim());

      payload.append(
        "registrationNumber",
        formData.registrationNumber.trim()
      );

      payload.append(
        "tradeLicenseNumber",
        formData.tradeLicenseNumber.trim()
      );

      payload.append("website", formData.website.trim());

      payload.append("address", formData.address.trim());

      payload.append(
        "description",
        formData.description.trim()
      );

      payload.append("password", formData.password);

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

      if (!response.ok || data.success === false) {
        throw new Error(
          data.message || "Organization registration failed."
        );
      }

      // Support both common API response formats
      const responseData = data.data || data;

      const registeredUser =
        responseData.user || null;

      const accessToken =
        responseData.token || null;

      // Ensure the server created an organization account
      if (
        !registeredUser ||
        String(registeredUser.role || "").toLowerCase() !==
          "organization"
      ) {
        throw new Error(
          "The server did not return a valid organization account. Please contact the administrator."
        );
      }

      // Check whether the organization has been approved.
      // A newly registered organization should normally be pending.
      const isApproved =
        registeredUser.isVerified === true ||
        registeredUser.verificationStatus === "approved" ||
        registeredUser.status === "approved";

      if (accessToken && isApproved) {
        // Update React authentication state
        setSession(registeredUser, accessToken);

        setSuccess(
          "Organization registered and approved successfully. Redirecting to your dashboard..."
        );

        setTimeout(() => {
          navigate("/organization/dashboard", {
            replace: true,
          });
        }, 1500);
      } else {
        // Do not grant dashboard access to an unapproved organization.
        setSuccess(
          "Your organization registration was submitted successfully. Please wait for administrator verification before logging in."
        );

        setTimeout(() => {
          navigate("/login", {
            replace: true,
          });
        }, 3000);
      }
    } catch (err) {
      setError(
        err.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  // Reusable styles
  const inputClass =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-[#D90083] focus:ring-2 focus:ring-pink-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-[#4B1248]";

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 px-4 py-10">

      <div className="mx-auto max-w-3xl">

        {/* HEADER */}
        <div className="mb-8 text-center">

          <Link
            to="/"
            className="mb-5 inline-flex items-center gap-2 text-2xl font-extrabold text-[#4B1248]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4B1248] text-white">
              <Building2 size={23} />
            </span>

            Her Gasha
          </Link>

          <h1 className="text-3xl font-extrabold text-[#4B1248] sm:text-4xl">
            Register Your Organization
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Join Her Gasha as an organization and help create
            safer opportunities and stronger support networks.
          </p>
        </div>

        {/* REGISTRATION CARD */}
        <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-xl sm:p-10">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* ORGANIZATION INFORMATION */}
            <div>
              <h2 className="text-xl font-bold text-[#4B1248]">
                Organization Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Tell us about your organization.
              </p>
            </div>

            {/* Organization Name */}
            <div>
              <label
                htmlFor="organizationName"
                className={labelClass}
              >
                Organization Name *
              </label>

              <div className="relative">
                <Building2
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="organizationName"
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  placeholder="Enter organization name"
                  className={`${inputClass} pl-11`}
                  required
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid gap-5 sm:grid-cols-2">

              <div>
                <label htmlFor="email" className={labelClass}>
                  Official Email *
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="organization@example.com"
                    className={`${inputClass} pl-11`}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone Number *
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+251..."
                    className={`${inputClass} pl-11`}
                    required
                  />
                </div>
              </div>

            </div>

            {/* Registration Number and Website */}
            <div className="grid gap-5 sm:grid-cols-2">

              <div>
                <label
                  htmlFor="registrationNumber"
                  className={labelClass}
                >
                  Registration Number
                </label>

                <input
                  id="registrationNumber"
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  placeholder="Organization registration ID"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="website" className={labelClass}>
                  Website
                </label>

                <div className="relative">
                  <Globe
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="website"
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://example.org"
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

            </div>

            {/* TRADE LICENSE */}
            <div className="border-t border-gray-100 pt-6">

              <h2 className="text-xl font-bold text-[#4B1248]">
                Trade License Verification
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Provide your organization's official trade
                license information for verification.
              </p>

            </div>

            {/* Trade License Number */}
            <div>
              <label
                htmlFor="tradeLicenseNumber"
                className={labelClass}
              >
                Trade License Number *
              </label>

              <input
                id="tradeLicenseNumber"
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
              <label htmlFor="tradeLicense" className={labelClass}>
                Upload Trade License Document *
              </label>

              <div className="rounded-xl border-2 border-dashed border-pink-200 bg-pink-50/50 p-5">

                <div className="flex flex-col items-center text-center">
                  <Upload size={30} className="text-[#D90083]" />

                  <p className="mt-2 text-sm font-semibold text-[#4B1248]">
                    Select your trade license
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    PDF, JPG, or PNG — maximum 5 MB
                  </p>

                  <input
                    id="tradeLicense"
                    type="file"
                    name="tradeLicense"
                    accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                    onChange={handleFileChange}
                    className="mt-4 w-full text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-[#4B1248] file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-[#351033]"
                    required
                  />
                </div>

                {formData.tradeLicense && (
                  <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                    <FileText size={18} />

                    <span className="break-all font-medium">
                      {formData.tradeLicense.name}
                    </span>
                  </div>
                )}

              </div>
            </div>

            {/* ADDRESS */}
            <div>
              <label htmlFor="address" className={labelClass}>
                Organization Address *
              </label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="City, region, country"
                  className={`${inputClass} pl-11`}
                  required
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label htmlFor="description" className={labelClass}>
                About Your Organization
              </label>

              <textarea
                id="description"
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

              <h2 className="text-xl font-bold text-[#4B1248]">
                Account Security
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Create a secure password for your organization account.
              </p>

            </div>

            {/* PASSWORD */}
            <div>
              <label htmlFor="password" className={labelClass}>
                Password *
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  className={`${inputClass} pl-11 pr-16`}
                  minLength={8}
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#D90083]"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label
                htmlFor="confirmPassword"
                className={labelClass}
              >
                Confirm Password *
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword ? "text" : "password"
                  }
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Enter your password again"
                  className={`${inputClass} pl-11 pr-16`}
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((previous) => !previous)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#D90083]"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
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
                className="mt-1 h-4 w-4 accent-[#D90083]"
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
                className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* SUCCESS MESSAGE */}
            {success && (
              <div
                role="status"
                className="flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
              >
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-xl bg-[#D90083] px-6 py-4 font-bold text-white shadow-lg transition hover:bg-[#B80070] disabled:cursor-not-allowed disabled:opacity-60"
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
              className="font-bold text-[#D90083] hover:underline"
            >
              Sign in
            </Link>
          </div>

          {/* BACK TO ROLE SELECTION */}
          <div className="mt-5 text-center">
            <Link
              to="/join"
              className="text-sm font-medium text-gray-500 hover:text-[#D90083]"
            >
              ← Back to account type selection
            </Link>
          </div>

        </div>

        {/* FOOTER */}
        <p className="mt-6 text-center text-xs text-gray-500">
          Her Gasha — Empowering women through safety, support,
          and opportunity.
        </p>

      </div>
    </div>
  );
}
