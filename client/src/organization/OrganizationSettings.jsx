
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  LockKeyhole,
  LogOut,
  Save,
  ShieldCheck,
  Settings,
  Mail,
  BriefcaseBusiness,
} from "lucide-react";

import useAuth from "../hooks/useAuth.js";

export default function OrganizationSettings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [settings, setSettings] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("organizationSettings")
      ) || {
        emailNotifications: true,
        applicationNotifications: true,
        opportunityNotifications: true,
        securityNotifications: true,
      };
    } catch {
      return {
        emailNotifications: true,
        applicationNotifications: true,
        opportunityNotifications: true,
        securityNotifications: true,
      };
    }
  });

  const [message, setMessage] = useState("");

  const handleToggle = (name) => {
    setSettings((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));

    setMessage("");
  };

  const handleSave = () => {
    localStorage.setItem(
      "organizationSettings",
      JSON.stringify(settings)
    );

    setMessage("Your preferences have been saved in this browser.");
  };

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to log out?"
    );

    if (!confirmed) return;

    logout();
    navigate("/login", { replace: true });
  };

  const notificationOptions = [
    {
      name: "emailNotifications",
      title: "Email Notifications",
      description: "Receive important account updates by email.",
      icon: Mail,
    },
    {
      name: "applicationNotifications",
      title: "Application Notifications",
      description: "Receive updates when applicants apply to your opportunities.",
      icon: Bell,
    },
    {
      name: "opportunityNotifications",
      title: "Opportunity Notifications",
      description: "Receive updates about your published opportunities.",
      icon: BriefcaseBusiness,
    },
    {
      name: "securityNotifications",
      title: "Security Notifications",
      description: "Receive alerts about important account security events.",
      icon: ShieldCheck,
    },
  ];

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
            Organization Settings
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage your account preferences and security.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-5 sm:p-8 space-y-6">

        {/* Account information */}
        <section className="bg-white border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
              <Settings className="text-green-700" size={23} />
            </div>

            <div>
              <h2 className="font-bold text-gray-900">
                Account Information
              </h2>
              <p className="text-sm text-gray-500">
                Your organization account details.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <p className="text-sm text-gray-500">
                Organization
              </p>
              <p className="font-semibold text-gray-800 mt-1">
                {user?.organizationName || user?.name || "Organization"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Email Address
              </p>
              <p className="font-semibold text-gray-800 mt-1 break-all">
                {user?.email || "Not available"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Account Type
              </p>
              <p className="font-semibold text-gray-800 mt-1 capitalize">
                {user?.role || "Organization"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Verification Status
              </p>
              <p className="font-semibold text-green-700 mt-1 capitalize">
                {user?.organizationVerificationStatus || "Not provided"}
              </p>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-white border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
              <Bell className="text-blue-700" size={23} />
            </div>

            <div>
              <h2 className="font-bold text-gray-900">
                Notification Preferences
              </h2>
              <p className="text-sm text-gray-500">
                Choose which notifications you want to receive.
              </p>
            </div>
          </div>

          <div className="divide-y">
            {notificationOptions.map((option) => {
              const Icon = option.icon;

              return (
                <div
                  key={option.name}
                  className="py-5 flex items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-gray-600" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {option.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {option.description}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={settings[option.name]}
                    onClick={() => handleToggle(option.name)}
                    className={`relative w-12 h-6 rounded-full transition shrink-0 ${
                      settings[option.name]
                        ? "bg-green-700"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition ${
                        settings[option.name]
                          ? "left-7"
                          : "left-1"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="border-t pt-5">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800"
            >
              <Save size={18} />
              Save Preferences
            </button>

            {message && (
              <p className="text-sm text-green-700 mt-3">
                {message}
              </p>
            )}
          </div>
        </section>

        {/* Security */}
        <section className="bg-white border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
              <LockKeyhole className="text-purple-700" size={23} />
            </div>

            <div>
              <h2 className="font-bold text-gray-900">
                Account Security
              </h2>
              <p className="text-sm text-gray-500">
                Keep your organization account secure.
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            Never share your password or login credentials with
            other people. Use a strong, unique password.
          </p>
        </section>

        {/* Logout */}
        <section className="bg-white border border-red-100 rounded-xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-bold text-gray-900">
                Sign Out
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Sign out of your organization account on this device.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-red-50 text-red-700 font-semibold hover:bg-red-100"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </section>

      </main>
    </div>
  );
}
