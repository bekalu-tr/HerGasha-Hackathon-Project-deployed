
import {
  HeartHandshake,
  Scale,
  HeartPulse,
  MessageCircle,
  Wallet,
  CalendarDays,
  Eye
} from "lucide-react";

const categoryIcons = {
  legal: Scale,
  health: HeartPulse,
  counselling: MessageCircle,
  financial: Wallet
};

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  assigned: "bg-purple-100 text-purple-700",
  in_progress: "bg-blue-100 text-blue-700",
  fulfilled: "bg-green-100 text-green-700",
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

export default function SupportCard({
  request,
  onView
}) {
  if (!request) return null;

  const category = request.category || "other";
  const Icon = categoryIcons[category] || HeartHandshake;
  const status = request.status || "pending";

  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">

      {/* Heading */}
      <div className="flex items-start justify-between gap-3">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-pinkBg flex items-center justify-center">
            <Icon className="w-5 h-5 text-magenta" />
          </div>

          <div>
            <h3 className="font-bold text-plum">
              {formatText(category)} Support
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              Request ID: {String(request._id || "").slice(-8) || "N/A"}
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
        {request.description
          ? request.description.length > 160
            ? `${request.description.slice(0, 160)}...`
            : request.description
          : "No description provided."}
      </p>

      {/* Details */}
      <div className="flex flex-col gap-3 mt-5 text-sm text-gray-500">

        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-magenta" />

          <span>
            Requested: {formatDate(request.createdAt)}
          </span>
        </div>

        {request.preferredContact && (
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-magenta" />

            <span>
              Preferred contact: {formatText(request.preferredContact)}
            </span>
          </div>
        )}

      </div>

      {/* View request */}
      {onView && (
        <button
          type="button"
          onClick={() => onView(request)}
          className="mt-5 w-full flex items-center justify-center gap-2 border border-plum text-plum py-2.5 rounded-xl font-semibold hover:bg-pinkBg transition-colors"
        >
          <Eye className="w-4 h-4" />
          View Request
        </button>
      )}

    </article>
  );
}
