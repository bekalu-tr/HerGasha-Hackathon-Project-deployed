
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  User,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  UserPlus,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

import useAuth from "../../hooks/useAuth.js";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    // Validate name
    if (form.name.trim().length < 2) {
      setError("Your name must contain at least 2 characters.");
      return;
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate password
    if (form.password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    // Confirm password
    if (form.password !== form.confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await register({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      navigate("/dashboard", { replace: true });

    } catch (err) {
      setError(
        err.message ||
        "Unable to create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#FFF3F9] to-pink-100 px-4 py-12">

      <div className="w-full max-w-lg rounded-3xl border border-pink-100 bg-white p-7 shadow-xl sm:p-9">

        {/* Header */}
        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#4B1248] text-white">
            <UserPlus size={32} />
          </div>

          <h1 className="mt-5 text-3xl font-extrabold text-[#4B1248]">
            Join Her Gasha
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Create your student account to access our services.
          </p>

        </div>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="mt-7 flex items-start gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700"
          >
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-[#4B1248]"
            >
              Full Name
            </label>

            <div className="relative">

              <User
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                minLength={2}
                maxLength={100}
                autoComplete="name"
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-gray-200 py-3.5 pl-12 pr-4 outline-none focus:border-[#D90083] focus:ring-2 focus:ring-pink-100"
              />

            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#4B1248]"
            >
              Email Address
            </label>

            <div className="relative">

              <Mail
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-gray-200 py-3.5 pl-12 pr-4 outline-none focus:border-[#D90083] focus:ring-2 focus:ring-pink-100"
              />

            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-[#4B1248]"
            >
              Password
            </label>

            <div className="relative">

              <LockKeyhole
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="Create a password (minimum 8 characters)"
                className="w-full rounded-xl border border-gray-200 py-3.5 pl-12 pr-12 outline-none focus:border-[#D90083] focus:ring-2 focus:ring-pink-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D90083]"
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>

            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-semibold text-[#4B1248]"
            >
              Confirm Password
            </label>

            <div className="relative">

              <LockKeyhole
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
                placeholder="Enter your password again"
                className="w-full rounded-xl border border-gray-200 py-3.5 pl-12 pr-12 outline-none focus:border-[#D90083] focus:ring-2 focus:ring-pink-100"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((previous) => !previous)
                }
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D90083]"
              >
                {showConfirmPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>

            </div>
          </div>

          {/* Security Information */}
          <div className="rounded-xl bg-[#FFF3F9] p-4 text-sm leading-6 text-gray-600">

            <div className="flex gap-2">

              <ShieldCheck
                className="mt-0.5 shrink-0 text-[#D90083]"
                size={19}
              />

              <p>
                New registrations create student accounts. Other roles
                require authorized account provisioning.
              </p>

            </div>

          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D90083] py-4 font-bold text-white shadow-md transition hover:bg-[#B80070] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}

            {!loading && <UserPlus size={18} />}
          </button>

        </form>

        {/* Login Link */}
        <p className="mt-7 text-center text-sm text-gray-600">
          Already have an account?{" "}

          <Link
            to="/login"
            className="font-bold text-[#D90083] hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
