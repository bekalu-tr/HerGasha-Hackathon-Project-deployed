
import {
  BriefcaseBusiness,
  MapPin,
  Building2,
  CalendarDays,
  ExternalLink,
  GraduationCap,
  Clock,
  Laptop
} from "lucide-react";

const typeIcons = {
  job: BriefcaseBusiness,
  internship: GraduationCap,
  part_time: Clock,
  short_term: CalendarDays,
  freelance: Laptop
};

const typeStyles = {
  job: "bg-purple-100 text-plum",
  internship: "bg-pink-100 text-magenta",
  part_time: "bg-blue-100 text-blue-700",
  short_term: "bg-yellow-100 text-yellow-700",
  freelance: "bg-green-100 text-green-700"
};

function formatText(value = "") {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(date) {
  if (!date) return "Not specified";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function isValidApplicationUrl(value) {
  if (!value) return false;

  try {
    const url = new URL(value);

    return ["https:", "http:"].includes(url.protocol);
  } catch {
    return false;
  }
}

export default function OpportunityCard({
  opportunity,
  onView,
  onApply
}) {
  if (!opportunity) return null;

  const {
    title,
    description,
    type,
    organization,
    location,
    deadline,
    applicationLink,
    status
  } = opportunity;

  const normalizedType = type || "job";

  const Icon = typeIcons[normalizedType] || BriefcaseBusiness;

  const typeStyle =
    typeStyles[normalizedType] || typeStyles.job;

  const validApplicationLink =
    isValidApplicationUrl(applicationLink);

  const expired =
    deadline &&
    !Number.isNaN(new Date(deadline).getTime()) &&
    new Date(deadline).getTime() < Date.now();

  // Only verified, non-expired opportunities can be applied to.
  const canApply =
    status === "verified" &&
    !expired &&
    validApplicationLink;

  const handleApply = () => {
    if (!canApply) return;

    if (onApply) {
      onApply(opportunity);
    } else {
      window.open(
        applicationLink,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  const handleView = () => {
    if (onView) {
      onView(opportunity);
    }
  };

  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">

      {/* Top accent */}
      <div className="h-1.5 bg-gradient-to-r from-plum to-magenta" />

      <div className="p-5">

        {/* Heading */}
        <div className="flex items-start justify-between gap-3">

          <div className="flex items-start gap-3 min-w-0">

            <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-pinkBg flex items-center justify-center">
              <Icon className="w-6 h-6 text-magenta" />
            </div>

            <div className="min-w-0">
              <h3 className="text-lg font-bold text-plum leading-snug break-words">
                {title || "Untitled Opportunity"}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {organization || "Organization not specified"}
              </p>
            </div>

          </div>

          {status === "verified" && (
            <span className="flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">
              Verified
            </span>
          )}

        </div>

        {/* Opportunity type */}
        <div className="mt-5">
          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${typeStyle}`}>
            {formatText(normalizedType)}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-4 leading-relaxed">
          {description
            ? description.length > 150
              ? `${description.slice(0, 150)}...`
              : description
            : "No description available."}
        </p>

        {/* Details */}
        <div className="mt-5 space-y-3 text-sm text-gray-500">

          {location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-magenta flex-shrink-0" />
              <span>{location}</span>
            </div>
          )}

          {organization && (
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-magenta flex-shrink-0" />
              <span>{organization}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-magenta flex-shrink-0" />

            <span>
              Deadline: {formatDate(deadline)}
            </span>
          </div>

        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">

          {onView && (
            <button
              type="button"
              onClick={handleView}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-plum text-plum font-semibold hover:bg-pinkBg transition-colors"
            >
              View Details
            </button>
          )}

          {canApply ? (
            <button
              type="button"
              onClick={handleApply}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-magenta text-white font-semibold hover:bg-plum transition-colors"
            >
              Apply Now
              <ExternalLink className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="flex-1 px-4 py-3 rounded-xl bg-gray-100 text-gray-400 font-semibold cursor-not-allowed"
            >
              {expired
                ? "Deadline Passed"
                : status !== "verified"
                  ? "Not Verified"
                  : "Application Unavailable"}
            </button>
          )}

        </div>

      </div>
    </article>
  );
}
