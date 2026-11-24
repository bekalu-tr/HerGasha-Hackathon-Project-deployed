
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  ArrowRight,
} from "lucide-react";
import useAuth from "../../hooks/useAuth.js";

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, user, loading: authLoading } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Redirect an already authenticated user
  if (!authLoading && isAuthenticated && user) {
    const destination =
      user.role === "organization"
        ? "/organization/dashboard"
        : "/dashboard";

    return (
      <RedirectUser
        navigate={navigate}
        destination={destination}
      />
    );
  }

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  // Submit login form

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    setSubmitting(true);

    const loggedInUser = await login({
      email: form.email.trim().toLowerCase(),
      password: form.password,
    });

    if (loggedInUser.role === "organization") {
      navigate("/organization/dashboard", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }

  } catch (err) {
    setError(err.message || "Login failed. Please try again.");
  } finally {
    setSubmitting(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-3 mb-5"
          >
            <div className="w-12 h-12 rounded-xl bg-green-700 flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>

            <span className="text-2xl font-bold text-green-800">
              Her Gasha
            </span>
          </Link>

          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-500">
            Sign in to your Her Gasha account
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">

          {error && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />

              <p className="text-sm">
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  disabled={submitting}
                  className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  disabled={submitting}
                  className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-12 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  disabled={submitting}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting || authLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-3 font-semibold text-white shadow-md transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

          </form>

          {/* Registration */}
          <div className="mt-7 border-t border-gray-100 pt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?
            </p>

            <div className="mt-3 flex flex-col items-center gap-3">
              <Link
                to="/register"
                className="font-semibold text-green-700 hover:text-green-900 hover:underline"
              >
                Register as Student
              </Link>

              <Link
                to="/join"
                className="font-semibold text-green-700 hover:text-green-900 hover:underline"
              >
                Register as Organization
              </Link>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-7 text-center">
          <p className="text-sm text-gray-500">
            Your Safety. Your Voice. Your Opportunity.
          </p>

          <Link
            to="/"
            className="mt-3 inline-block text-sm text-green-700 hover:underline"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
};

// Small redirect component
const RedirectUser = ({ navigate, destination }) => {
  useState(() => {
    navigate(destination, { replace: true });
  });

  return null;
};

export default Login;
