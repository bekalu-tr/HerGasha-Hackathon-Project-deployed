
import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Save,
  RefreshCw,
  ShieldCheck
} from "lucide-react";
import api from "../../services/api.js";
import useAuth from "../hooks/useAuth";

import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

export default function Profile() {
  const { user, token, login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    university: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Support common response formats from Express controllers.
  const extractUser = (responseData) => {
    return (
      responseData?.user ||
      responseData?.data?.user ||
      responseData?.data ||
      responseData
    );
  };

  // Load current user's profile.
  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/users/me");
        const profile = extractUser(response.data);

        if (!active) return;

        setFormData({
          name: profile.name || "",
          email: profile.email || "",
          phone: profile.phone || "",
          university: profile.university || ""
        });
      } catch (err) {
        if (!active) return;

        setError(
          err.response?.data?.message ||
          "Unable to load your profile. Please try again."
        );
      } finally {
        if (active) setLoading(false);
      }
    };

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

  // Update input fields.
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    setError("");
    setSuccess("");
  };

  // Submit profile updates.
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Name and email are required.");
      return;
    }

    try {
      setSaving(true);

      const response = await api.patch("/users/me", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        university: formData.university.trim()
      });

      const updatedUser = extractUser(response.data);

      // Update the global authentication state and local session.
      login(
        {
          ...user,
          ...updatedUser,
          name: updatedUser.name || formData.name,
          email: updatedUser.email || formData.email,
          phone: updatedUser.phone ?? formData.phone,
          university:
            updatedUser.university ?? formData.university
        },
        token
      );

      setSuccess("Your profile has been updated successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to update your profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader text="Loading your profile..." fullScreen />;
  }

  return (
    <section className="min-h-screen bg-pinkBg py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Page heading */}
        <div className="mb-8">
          <p className="text-magenta font-semibold text-sm">
            HER GASHA ACCOUNT
          </p>

          <h1 className="text-3xl font-bold text-plum mt-2">
            My Profile
          </h1>

          <p className="text-gray-600 mt-2">
            Manage your personal information and account details.
          </p>
        </div>

        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          {/* Profile header */}
          <div className="bg-plum p-8 text-white">
            <div className="flex flex-col sm:flex-row items-center gap-5">

              <div className="w-20 h-20 rounded-full bg-white text-plum flex items-center justify-center">
                <User className="w-10 h-10" />
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold">
                  {formData.name || "Her Gasha User"}
                </h2>

                <p className="text-pink-100 mt-1">
                  {formData.email}
                </p>

                <div className="mt-3 inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  {user?.role?.replaceAll("_", " ") || "Student"}
                </div>
              </div>

            </div>
          </div>

          {/* Profile form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">

            {error && (
              <div className="mb-5">
                <ErrorMessage
                  message={error}
                  onClose={() => setError("")}
                />
              </div>
            )}

            {success && (
              <div
                role="status"
                className="mb-5 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700"
              >
                {success}
              </div>
            )}

            <h3 className="text-xl font-bold text-plum mb-6">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <Input
                label="Full Name"
                name="name"
                placeholder="Enter your full name"
                icon={User}
                value={formData.name}
                onChange={handleChange}
                required
              />

              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter your email"
                icon={Mail}
                value={formData.email}
                onChange={handleChange}
                required
              />

              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                icon={Phone}
                value={formData.phone}
                onChange={handleChange}
              />

              <Input
                label="University"
                name="university"
                placeholder="Enter your university"
                icon={GraduationCap}
                value={formData.university}
                onChange={handleChange}
              />

            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-end">

              <Button
                type="button"
                variant="outline"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="w-4 h-4" />
                Reset
              </Button>

              <Button
                type="submit"
                loading={saving}
                disabled={saving}
              >
                <Save className="w-4 h-4" />
                Save Changes
              </Button>

            </div>

          </form>
        </div>

        <p className="text-sm text-gray-500 mt-5 text-center">
          Your account information is managed securely by Her Gasha.
        </p>

      </div>
    </section>
  );
}
