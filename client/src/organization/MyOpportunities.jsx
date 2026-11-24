
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Plus,
  Search,
  Trash2,
  MapPin,
  CalendarDays,
  X,
  ArrowLeft,
} from "lucide-react";

import useAuth from "../hooks/useAuth.js";

export default function MyOpportunities() {
  const { user, logout } = useAuth();

  const [opportunities, setOpportunities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    title: "",
    type: "Full-time",
    location: "",
    description: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.location.trim() ||
      !form.description.trim() ||
      !form.deadline
    ) {
      setMessage("Please complete all fields.");
      return;
    }

    const newOpportunity = {
      id: crypto.randomUUID(),
      ...form,
      createdAt: new Date().toISOString(),
    };

    setOpportunities((previous) => [
      newOpportunity,
      ...previous,
    ]);

    setForm({
      title: "",
      type: "Full-time",
      location: "",
      description: "",
      deadline: "",
    });

    setShowForm(false);
    setMessage("Opportunity added to this session.");
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this opportunity?"
    );

    if (!confirmed) return;

    setOpportunities((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  const filteredOpportunities = opportunities.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">

      <header className="bg-white border-b px-5 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              to="/organization/dashboard"
              className="inline-flex items-center gap-2 text-sm text-green-700 hover:underline mb-3"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>

            <h1 className="text-2xl font-bold text-gray-900">
              My Opportunities
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage your organization's jobs and internships.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-3 text-white font-semibold hover:bg-green-800"
          >
            <Plus size={18} />
            Create Opportunity
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-5 sm:p-8">

        {message && (
          <div className="mb-5 rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            {message}
            <button
              onClick={() => setMessage("")}
              className="float-right font-bold"
              aria-label="Dismiss message"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="bg-white rounded-xl border p-5 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">
                Opportunities in this session
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {opportunities.length}
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search opportunities..."
                className="w-full border rounded-lg py-3 pl-10 pr-3 outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>
          </div>
        </div>

        {filteredOpportunities.length === 0 ? (
          <div className="bg-white border border-dashed rounded-xl p-10 text-center">
            <div className="mx-auto w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-4">
              <BriefcaseBusiness className="text-green-700" size={28} />
            </div>

            <h2 className="text-lg font-bold text-gray-800">
              No opportunities found
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              Create an opportunity to start receiving applications.
            </p>

            <button
              onClick={() => setShowForm(true)}
              className="mt-5 bg-green-700 text-white px-5 py-3 rounded-lg hover:bg-green-800"
            >
              Create your first opportunity
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredOpportunities.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-xl border p-5 shadow-sm"
              >
                <div className="flex justify-between items-start gap-3">
                  <span className="text-xs font-semibold bg-green-50 text-green-700 px-3 py-1 rounded-full">
                    {item.type}
                  </span>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                    aria-label="Delete opportunity"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <h3 className="font-bold text-lg text-gray-900 mt-4">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {item.description}
                </p>

                <div className="mt-5 space-y-2 text-sm text-gray-500">
                  <p className="flex items-center gap-2">
                    <MapPin size={16} />
                    {item.location}
                  </p>

                  <p className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    Deadline: {item.deadline}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Create opportunity modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Create Opportunity
              </h2>

              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-red-600"
                aria-label="Close form"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Opportunity Title
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Example: Frontend Developer"
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Opportunity Type
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-200"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                  <option>Volunteer</option>
                  <option>Contract</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Location
                </label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Example: Wolkite, Ethiopia"
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Application Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={form.deadline}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe the opportunity and requirements..."
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-200"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-3 border rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800"
                >
                  Create Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
