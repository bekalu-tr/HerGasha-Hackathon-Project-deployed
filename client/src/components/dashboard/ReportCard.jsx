
import {
  FileText,
  CalendarDays,
  MapPin,
  Eye,
  ShieldCheck
} from "lucide-react";

const statusStyles = {
  submitted: "bg-blue-100 text-blue-700",
  under_review: "bg-yellow-100 text-yellow-700",
  assigned: "bg-purple-100 text-purple-700",
  in_progress: "bg-orange-100 text-orange-700",
  resolved: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-700"
};

const formatText = (value = "") => {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const formatDate = (date) => {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString();
};

export default function ReportCard({
  report,
  onView
}) {
  if (!report) return null;

  const status = report.status || "submitted";

  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">

      {/* Report heading */}
      <div className="flex items-start justify-between gap-3">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-pinkBg flex items-center justify-center">
            <FileText className="w-5 h-5 text-magenta" />
          </div>

          <div>
            <h3 className="font-bold text-plum">
              {formatText(report.category || "other")}
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              Report ID: {String(report._id || "").slice(-8) || "N/A"}
            </p>
          </div>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
            statusStyles[status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {formatText(status)}
        </span>

      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mt-5 leading-relaxed">
        {report.description
          ? report.description.length > 160
            ? `${report.description.slice(0, 160)}...`
            : report.description
          : "No description provided."}
      </p>

      {/* Report information */}
      <div className="flex flex-col gap-3 mt-5 text-sm text-gray-500">

        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-magenta" />

          <span>
            Incident: {formatDate(report.incidentDate)}
          </span>
        </div>

        {report.location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-magenta" />
            <span>{report.location}</span>
          </div>
        )}

        {report.anonymous && (
          <div className="flex items-center gap-2 text-green-700">
            <ShieldCheck className="w-4 h-4" />
            <span>Submitted with anonymous display preference</span>
          </div>
        )}

      </div>

      {/* View button */}
      {onView && (
        <button
          type="button"
          onClick={() => onView(report)}
          className="mt-5 w-full flex items-center justify-center gap-2 border border-plum text-plum py-2.5 rounded-xl font-semibold hover:bg-pinkBg transition-colors"
        >
          <Eye className="w-4 h-4" />
          View Report
        </button>
      )}

    </article>
  );
}
