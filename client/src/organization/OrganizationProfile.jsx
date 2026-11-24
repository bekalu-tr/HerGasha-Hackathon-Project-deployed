
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Save,
  FileText,
  CheckCircle2,
} from "lucide-react";

import useAuth from "../hooks/useAuth.js";

export default function OrganizationProfile() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    organizationName: user?.organizationName || user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    registrationNumber: user?.registrationNumber || "",
    tradeLicenseNumber: user?.tradeLicenseNumber || "",
    website: user?.website || "",
    address: user?.address || "",
    description: user?.description || "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));

    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage(
      "Your changes are displayed in this form only. Connect the profile update API to save them permanently."
    );
  };

  const verificationStatus =
    user?.organizationVerificationStatus || "Not provided";

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-white border-b px-5 sm:px-8 py-5">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/organization/dashboard"
            className="inline-flex items-center gap-2 text-sm text-green-700 hover:underline mb-3"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <h1 className="text-2xl font-bold text-gray-900">
            Organization Profile
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            View and manage your organization information.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-5 sm:p-8">

        <div className="bg-white border rounded-xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">
                <Building2 size={32} className="text-green-700" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {form.organizationName || "Your Organization"}
                </h2>
                <p className="text-sm text-gray-500">
                  Organization account
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2
                size={18}
                className={
                  verificationStatus === "approved"
                    ? "text-green-600"
                    : "text-orange-500"
                }
              />

              <span className="font-medium capitalize text-gray-700">
                {verificationStatus}
              </span>
            </div>
          </div>
        </div>

        {message && (
          <div className="mb-5 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white border rounded-xl p-6 space-y-6"
        >

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Organization Information
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Your organization's registered details.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="block text-sm font-semibold mb-2">
                Organization Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="organizationName"
                  value={form.organizationName}
                  onChange={handleChange}
                  className="w-full border rounded-lg py-3 pl-10 pr-3 outline-none focus:ring-2 focus:ring-green-200"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg py-3 pl-10 pr-3 bg-gray-50 outline-none"
                  disabled
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Contact support if you need to change your login email.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border rounded-lg py-3 pl-10 pr-3 outline-none focus:ring-2 focus:ring-green-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Registration Number
              </label>
              <input
                name="registrationNumber"
                value={form.registrationNumber}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Trade License Number
              </label>
              <input
                name="tradeLicenseNumber"
                value={form.tradeLicenseNumber}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Website
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="https://example.org"
                  className="w-full border rounded-lg py-3 pl-10 pr-3 outline-none focus:ring-2 focus:ring-green-200"
                />
              </div>
            </div>

          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Organization Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows={2}
                className="w-full border rounded-lg py-3 pl-10 pr-3 outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              About Organization
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                placeholder="Tell people about your organization..."
                className="w-full border rounded-lg py-3 pl-10 pr-3 outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>
          </div>

          <div className="flex justify-end border-t pt-5">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}
