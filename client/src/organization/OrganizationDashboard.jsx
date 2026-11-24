
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  FileText,
  Building2,
  Settings,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  ArrowRight,
  PlusCircle,
  Users,
  UserCircle,
} from "lucide-react";
import { useState } from "react";

import useAuth from "../hooks/useAuth.js";

export default function OrganizationDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const organizationName =
    user?.organizationName || user?.name || "Your Organization";

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const navigation = [
    {
      name: "Dashboard",
      path: "/organization/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Opportunities",
      path: "/organization/opportunities",
      icon: BriefcaseBusiness,
    },
    {
      name: "Applications",
      path: "/organization/applications",
      icon: FileText,
    },
    {
      name: "Organization Profile",
      path: "/organization/profile",
      icon: Building2,
    },
    {
      name: "Settings",
      path: "/organization/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">

          {/* Logo */}
          <div className="px-6 py-6 border-b border-gray-100 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-green-700 flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>

              <div>
                <h1 className="text-xl font-bold text-green-800">
                  Her Gasha
                </h1>
                <p className="text-xs text-gray-500">
                  Organization Portal
                </p>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500"
              aria-label="Close menu"
            >
              <X />
            </button>
          </div>

          {/* Organization information */}
          <div className="p-5">
            <div className="rounded-xl bg-green-50 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-green-800" />
                </div>

                <div className="min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">
                    {organizationName}
                  </p>
                  <p className="text-xs text-gray-500">
                    Organization Account
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2">
            <p className="px-3 mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Organization Menu
            </p>

            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                    item.path === "/organization/dashboard"
                      ? "bg-green-700 text-white"
                      : "text-gray-600 hover:bg-green-50 hover:text-green-800"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition font-medium"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>

        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">

        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-5 sm:px-8 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Organization Dashboard
              </h2>
              <p className="text-sm text-gray-500">
                Manage your organization's activities
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-gray-800">
                {organizationName}
              </p>
              <p className="text-xs text-gray-500">
                Organization
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <UserCircle className="w-6 h-6 text-green-700" />
            </div>
          </div>
        </header>

        {/* Dashboard body */}
        <div className="p-5 sm:p-8 max-w-7xl mx-auto">

          {/* Welcome */}
          <section className="rounded-2xl bg-gradient-to-r from-green-800 to-emerald-600 p-6 sm:p-8 text-white mb-8">
            <div className="max-w-2xl">
              <p className="text-green-100 text-sm font-medium mb-2">
                HER GASHA ORGANIZATION PORTAL
              </p>

              <h1 className="text-2xl sm:text-3xl font-bold mb-3">
                Welcome, {organizationName}!
              </h1>

              <p className="text-green-50 leading-relaxed">
                Manage your opportunities, review applications,
                and update your organization information from
                one place.
              </p>

              <Link
                to="/organization/opportunities"
                className="inline-flex items-center gap-2 mt-6 bg-white text-green-800 px-5 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
              >
                Manage Opportunities
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* Quick action cards */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-5">
              Organization Management
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

              {/* Opportunities */}
              <Link
                to="/organization/opportunities"
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-green-300 transition group"
              >
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                  <BriefcaseBusiness className="w-6 h-6 text-green-700" />
                </div>

                <h3 className="font-bold text-gray-800 text-lg mb-2">
                  My Opportunities
                </h3>

                <p className="text-sm text-gray-500 mb-4">
                  Create, manage, and review your job and internship opportunities.
                </p>

                <span className="text-green-700 text-sm font-semibold flex items-center gap-2">
                  Manage opportunities
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </span>
              </Link>

              {/* Applications */}
              <Link
                to="/organization/applications"
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-green-300 transition group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-700" />
                </div>

                <h3 className="font-bold text-gray-800 text-lg mb-2">
                  Applications
                </h3>

                <p className="text-sm text-gray-500 mb-4">
                  View and manage applications submitted for your opportunities.
                </p>

                <span className="text-blue-700 text-sm font-semibold flex items-center gap-2">
                  View applications
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </span>
              </Link>

              {/* Profile */}
              <Link
                to="/organization/profile"
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-green-300 transition group"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-purple-700" />
                </div>

                <h3 className="font-bold text-gray-800 text-lg mb-2">
                  Organization Profile
                </h3>

                <p className="text-sm text-gray-500 mb-4">
                  View and update your organization's information.
                </p>

                <span className="text-purple-700 text-sm font-semibold flex items-center gap-2">
                  Manage profile
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </span>
              </Link>

            </div>
          </section>

          {/* Account information */}
          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <ShieldCheck className="w-6 h-6 text-green-700" />
              <h2 className="text-lg font-bold text-gray-800">
                Account Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Organization Name
                </p>
                <p className="font-semibold text-gray-800">
                  {organizationName}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Email Address
                </p>
                <p className="font-semibold text-gray-800 break-all">
                  {user?.email || "Not available"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Account Role
                </p>
                <p className="font-semibold text-gray-800 capitalize">
                  {user?.role || "Organization"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Verification Status
                </p>
                <p className="font-semibold text-green-700 capitalize">
                  {user?.organizationVerificationStatus || "Not provided"}
                </p>
              </div>

            </div>

            <Link
              to="/organization/profile"
              className="inline-flex items-center gap-2 mt-6 text-green-700 font-semibold hover:underline"
            >
              Update organization profile
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

          {/* Footer */}
          <footer className="text-center text-sm text-gray-400 mt-10">
            Her Gasha © {new Date().getFullYear()}.
            Your Safety. Your Voice. Your Opportunity.
          </footer>

        </div>
      </main>
    </div>
  );
}
