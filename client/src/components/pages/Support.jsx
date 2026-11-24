
import { useState } from "react";
import {
  HeartHandshake,
  Scale,
  HeartPulse,
  Brain,
  Wallet,
  Send,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import api from "../../services/api.js";

const Support = () => {
  const [form, setForm] = useState({
    category: "",
    description: "",
    preferredContact: "email"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const supportTypes = [
    {
      value: "legal",
      title: "Legal Support",
      description: "Request information or access to legal assistance.",
      icon: Scale
    },
    {
      value: "health",
      title: "Health Support",
      description: "Request help accessing health-related services.",
      icon: HeartPulse
    },
    {
      value: "counselling",
      title: "Counselling",
      description: "Request access to counselling services.",
      icon: Brain
    },
    {
      value: "financial",
      title: "Financial Support",
      description: "Request information about financial assistance.",
      icon: Wallet
    }
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.category) {
      setError("Please select a support category.");
      return;
    }

    if (form.description.trim().length < 10) {
      setError("Please provide at least 10 characters describing your request.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/support", {
        ...form,
        description: form.description.trim()
      });

      if (response.data.success === false) {
        throw new Error(
          response.data.message || "Unable to submit your request."
        );
      }

      setSuccess("Your support request has been submitted successfully.");

      setForm({
        category: "",
        description: "",
        preferredContact: "email"
      });

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF3F9] px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-5xl">

        <div className="mb-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#4B1248] text-white">
            <HeartHandshake size={32} />
          </div>

          <h1 className="mt-5 text-3xl font-extrabold text-[#4B1248] sm:text-4xl">
            Support Services
          </h1>

          <p className="mx-auto mt-3 max-w-2xl leading-7 text-gray-600">
            Everyone deserves access to appropriate support.
            Choose the type of assistance you need and send a request.
          </p>
        </div>

        <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {supportTypes.map((item) => {
            const Icon = item.icon;
            const selected = form.category === item.value;

            return (
              <button
                type="button"
                key={item.value}
                onClick={() =>
                  setForm((previous) => ({
                    ...previous,
                    category: item.value
                  }))
                }
                aria-pressed={selected}
                className={`rounded-2xl border p-5 text-left transition ${
                  selected
                    ? "border-[#D90083] bg-pink-50 ring-2 ring-pink-200"
                    : "border-pink-100 bg-white hover:border-[#D90083]"
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 text-[#D90083]">
                  <Icon size={25} />
                </div>

                <h2 className="mt-4 font-bold text-[#4B1248]">
                  {item.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {item.description}
                </p>

                <span className="mt-4 block text-xs font-bold text-[#D90083]">
                  {selected ? "Selected" : "Select this service"}
                </span>
              </button>
            );
          })}
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm sm:p-9"
        >
          <h2 className="text-xl font-bold text-[#4B1248]">
            Request Assistance
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Describe the type of assistance you are looking for.
          </p>

          {error && (
            <div role="alert" className="mt-6 flex gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700">
              <AlertCircle size={18} className="shrink-0" />
              {error}
            </div>
          )}

          {success && (
            <div role="status" className="mt-6 flex gap-2 rounded-xl bg-green-50 p-4 text-sm text-green-700">
              <CheckCircle2 size={18} className="shrink-0" />
              {success}
            </div>
          )}

          <div className="mt-7">
            <label htmlFor="category" className="mb-2 block text-sm font-semibold text-[#4B1248]">
              Selected support category *
            </label>

            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#D90083]"
            >
              <option value="">Choose support category</option>
              {supportTypes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6">
            <label htmlFor="description" className="mb-2 block text-sm font-semibold text-[#4B1248]">
              Explain your request *
            </label>

            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              minLength={10}
              maxLength={5000}
              rows={6}
              required
              placeholder="Describe the assistance you need..."
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#D90083] focus:ring-2 focus:ring-pink-100"
            />

            <p className="mt-1 text-right text-xs text-gray-500">
              {form.description.length}/5000 characters
            </p>
          </div>

          <div className="mt-6">
            <label htmlFor="preferredContact" className="mb-2 block text-sm font-semibold text-[#4B1248]">
              Preferred contact method
            </label>

            <select
              id="preferredContact"
              name="preferredContact"
              value={form.preferredContact}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#D90083]"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#D90083] px-6 py-4 font-bold text-white transition hover:bg-[#B80070] disabled:opacity-60"
          >
            {loading ? "Sending request..." : "Submit Support Request"}
            {!loading && <Send size={18} />}
          </button>

          <p className="mt-5 text-center text-xs leading-6 text-gray-500">
            Your request is associated with your account.
            Contact preferences do not guarantee that a support
            provider has already been assigned.
          </p>
        </form>

      </div>
    </div>
  );
};

export default Support;
