
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  LockKeyhole,
  Send,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import api from "../../services/api.js";

const Report = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    category: "",
    description: "",
    incidentDate: "",
    location: "",
    anonymous: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const categories = [
    { value: "harassment", label: "Harassment" },
    { value: "sexual_harassment", label: "Sexual harassment" },
    { value: "threats", label: "Threats" },
    { value: "blackmail", label: "Blackmail" },
    { value: "retaliation", label: "Retaliation" },
    { value: "discrimination", label: "Discrimination" },
    { value: "violence", label: "Violence" },
    { value: "other", label: "Other" }
  ];

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (form.description.trim().length < 20) {
      setError("Please provide at least 20 characters in your description.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        description: form.description.trim(),
        location: form.location.trim(),
        incidentDate: form.incidentDate || null
      };

      const response = await api.post("/reports", payload);

      if (response.data.success === false) {
        throw new Error(response.data.message || "Report submission failed.");
      }

      setSuccess("Your report has been submitted successfully.");

      setForm({
        category: "",
        description: "",
        incidentDate: "",
        location: "",
        anonymous: false
      });

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Unable to submit your report. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF3F9] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#4B1248] text-white">
            <ShieldCheck size={32} />
          </div>

          <h1 className="mt-5 text-3xl font-extrabold text-[#4B1248]">
            Submit a Report
          </h1>

          <p className="mt-3 leading-7 text-gray-600">
            Share your concern through the Her Gasha reporting pathway.
            Provide only the information you feel comfortable sharing.
          </p>
        </div>

        <div className="mb-6 flex gap-3 rounded-xl border border-pink-200 bg-white p-4">
          <LockKeyhole className="mt-1 shrink-0 text-[#D90083]" size={22} />
          <div>
            <h2 className="font-bold text-[#4B1248]">
              Your information matters
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Reports may contain sensitive information. Access must be
              restricted to authorized people under the platform's
              privacy and access policies.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-pink-100 bg-white p-6 shadow-sm sm:p-8"
        >
          {error && (
            <div role="alert" className="flex gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-700">
              <AlertCircle size={18} className="shrink-0" />
              {error}
            </div>
          )}

          {success && (
            <div role="status" className="flex gap-2 rounded-lg bg-green-50 p-4 text-sm text-green-700">
              <CheckCircle2 size={18} className="shrink-0" />
              {success}
            </div>
          )}

          <div>
            <label htmlFor="category" className="mb-2 block text-sm font-semibold text-[#4B1248]">
              Type of incident *
            </label>

            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[#D90083] focus:ring-2 focus:ring-pink-100"
            >
              <option value="">Select an incident category</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="mb-2 block text-sm font-semibold text-[#4B1248]">
              Describe what happened *
            </label>

            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              minLength={20}
              maxLength={10000}
              rows={7}
              placeholder="Describe your concern. Include only details you feel comfortable sharing."
              className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D90083] focus:ring-2 focus:ring-pink-100"
            />

            <p className="mt-1 text-right text-xs text-gray-500">
              {form.description.length}/10000 characters
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="incidentDate" className="mb-2 block text-sm font-semibold text-[#4B1248]">
                Incident date
              </label>

              <input
                id="incidentDate"
                type="date"
                name="incidentDate"
                value={form.incidentDate}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#D90083]"
              />
            </div>

            <div>
              <label htmlFor="location" className="mb-2 block text-sm font-semibold text-[#4B1248]">
                Location (optional)
              </label>

              <input
                id="location"
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                maxLength={300}
                placeholder="Enter a location if comfortable"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#D90083]"
              />
            </div>
          </div>

          <div className="rounded-xl bg-[#FFF3F9] p-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                name="anonymous"
                checked={form.anonymous}
                onChange={handleChange}
                className="mt-1 h-4 w-4 accent-[#D90083]"
              />

              <span>
                <span className="block font-semibold text-[#4B1248]">
                  Request anonymous display
                </span>
                <span className="mt-1 block text-sm leading-6 text-gray-600">
                  This option currently records your account with the report.
                  It is not true anonymous submission or a guarantee that
                  your identity is hidden.
                </span>
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D90083] px-6 py-4 font-bold text-white transition hover:bg-[#B80070] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Report"}
            {!loading && <Send size={18} />}
          </button>

          <p className="text-center text-xs leading-5 text-gray-500">
            If you are in immediate danger, contact local emergency
            services or a trusted person. This platform is not an
            emergency response service.
          </p>
        </form>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 w-full text-center text-sm font-semibold text-[#4B1248] hover:text-[#D90083]"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Report;
