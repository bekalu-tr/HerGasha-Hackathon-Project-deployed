
import { useState } from "react";
import { AlertTriangle, Send } from "lucide-react";

const RetaliationForm = ({
  onSubmit,
  loading = false,
}) => {
  const [form, setForm] = useState({
    incidentType: "",
    description: "",
    incidentDate: "",
    location: "",
  });

  const [error, setError] = useState("");

  const update = (name, value) => {
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.incidentType || form.description.trim().length < 10) {
      setError("Select an incident type and provide more details.");
      return;
    }

    try {
      await onSubmit?.({
        ...form,
        description: form.description.trim(),
      });

      setForm({
        incidentType: "",
        description: "",
        incidentDate: "",
        location: "",
      });
    } catch (err) {
      setError(err.message || "Unable to submit retaliation report.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-xl bg-red-50 p-4 text-red-800">
        <div className="flex items-center gap-2 font-semibold">
          <AlertTriangle size={20} />
          Report retaliation
        </div>
        <p className="mt-2 text-sm leading-6">
          If someone has threatened, intimidated or punished you because
          of reporting, you can record what happened here.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Type of retaliation *
        </label>

        <select
          required
          value={form.incidentType}
          onChange={(e) => update("incidentType", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
        >
          <option value="">Choose an incident type</option>
          <option value="grade_change">Unexpected grade change</option>
          <option value="threat">Threat or intimidation</option>
          <option value="academic_punishment">Academic punishment</option>
          <option value="discrimination">Discrimination</option>
          <option value="pressure_to_withdraw">Pressure to withdraw report</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          What happened? *
        </label>

        <textarea
          required
          rows={5}
          maxLength={5000}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Describe what happened..."
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Date of incident
          </label>
          <input
            type="date"
            value={form.incidentDate}
            onChange={(e) => update("incidentDate", e.target.value)}
            max={new Date().toISOString().slice(0, 10)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Location
          </label>
          <input
            type="text"
            maxLength={200}
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            placeholder="Optional"
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
          />
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-60"
      >
        <Send size={18} />
        {loading ? "Submitting..." : "Submit retaliation report"}
      </button>
    </form>
  );
};

export default RetaliationForm;
