
import { useState } from "react";
import { Send, ShieldCheck, AlertCircle } from "lucide-react";
import AnonymousOption from "./AnonymousOption";
import EvidenceUpload from "./EvidenceUpload";

const initialForm = {
  privacy: "anonymous",
  category: "",
  description: "",
  incidentDate: "",
  location: "",
  accusedDetails: "",
  requestLegalGuidance: false,
  consentToReferral: false,
};

const ReportForm = ({
  onSubmit,
  loading = false,
}) => {
  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  const updateField = (name, value) => {
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.category || !form.description.trim()) {
      setError("Please select a category and describe what happened.");
      return;
    }

    if (form.description.trim().length < 10) {
      setError("Please provide a little more detail.");
      return;
    }

    if (form.privacy === "anonymous" && form.consentToReferral) {
      // Referral consent is a separate choice from anonymity.
      // The backend must enforce the actual sharing permissions.
    }

    try {
      await onSubmit?.({
        ...form,
        description: form.description.trim(),
        evidence: files,
      });
    } catch (err) {
      setError(err.message || "Unable to submit your report.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Submit a Safe Report
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          Tell us what happened. Share only the information you feel
          comfortable providing.
        </p>
      </div>

      <AnonymousOption
        value={form.privacy}
        onChange={(value) => updateField("privacy", value)}
      />

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Incident category *
          </label>

          <select
            required
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
          >
            <option value="">Select incident category</option>
            <option value="sexual_harassment">Sexual harassment</option>
            <option value="gender_based_violence">
              Gender-based violence
            </option>
            <option value="bullying">Bullying or intimidation</option>
            <option value="threats">Threats and retaliation</option>
            <option value="discrimination">Discrimination</option>
            <option value="abuse_of_authority">Abuse of authority</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Describe what happened *
          </label>

          <textarea
            required
            rows={6}
            maxLength={5000}
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Describe the incident in your own words..."
            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />

          <p className="mt-1 text-right text-xs text-gray-400">
            {form.description.length}/5000
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Incident date
            </label>
            <input
              type="date"
              value={form.incidentDate}
              onChange={(e) =>
                updateField("incidentDate", e.target.value)
              }
              max={new Date().toISOString().slice(0, 10)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
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
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="Optional location"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Person or institution involved
          </label>
          <input
            type="text"
            maxLength={300}
            value={form.accusedDetails}
            onChange={(e) =>
              updateField("accusedDetails", e.target.value)
            }
            placeholder="Optional. Share only what you feel safe sharing."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
          />
        </div>
      </div>

      <EvidenceUpload files={files} onChange={setFiles} />

      <div className="space-y-4 rounded-xl border border-gray-200 p-4">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={form.requestLegalGuidance}
            onChange={(e) =>
              updateField("requestLegalGuidance", e.target.checked)
            }
            className="mt-1 accent-green-700"
          />
          <span>
            <span className="block text-sm font-semibold text-gray-800">
              I would like legal guidance
            </span>
            <span className="text-xs text-gray-500">
              Request information about available legal support.
            </span>
          </span>
        </label>

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={form.consentToReferral}
            onChange={(e) =>
              updateField("consentToReferral", e.target.checked)
            }
            className="mt-1 accent-green-700"
          />
          <span>
            <span className="block text-sm font-semibold text-gray-800">
              I consent to a support referral
            </span>
            <span className="text-xs text-gray-500">
              I agree to be contacted about sharing necessary information
              with an approved support organization. Details and recipient
              must be explained before sharing.
            </span>
          </span>
        </label>
      </div>

      <div className="flex gap-3 rounded-lg bg-green-50 p-4 text-sm text-green-800">
        <ShieldCheck size={22} className="shrink-0" />
        <p>
          Your report should only be accessible to authorized people.
          This form alone does not guarantee anonymity or confidentiality;
          those protections must also be enforced by the backend.
        </p>
      </div>

      {error && (
        <p className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle size={18} />
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send size={18} />
        {loading ? "Submitting..." : "Submit Safe Report"}
      </button>
    </form>
  );
};

export default ReportForm;
