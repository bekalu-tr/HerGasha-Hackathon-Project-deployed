
import { CheckCircle, Clock, Circle } from "lucide-react";
{update.createdAt
  ? formatDate(update.createdAt)
  : "Date unavailable"}

const CaseTimeline = ({ updates = [] }) => {
  if (!updates.length) {
    return (
      <div className="rounded-xl border border-gray-200 p-6 text-center">
        <Clock className="mx-auto mb-2 text-gray-400" size={28} />
        <p className="font-medium text-gray-700">
          No updates yet
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Case progress will appear here when updates are available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <h3 className="font-semibold text-gray-900">
        Case activity
      </h3>

      <div className="relative space-y-6">
        {updates.map((update, index) => {
          const isLatest = index === 0;
          const Icon = isLatest ? Clock : CheckCircle;

          return (
            <div key={update._id || index} className="relative flex gap-4">
              {index !== updates.length - 1 && (
                <div className="absolute left-[15px] top-9 h-full w-px bg-gray-200" />
              )}

              <div className={`z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                isLatest
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-500"
              }`}>
                <Icon size={17} />
              </div>

              <div className="min-w-0 flex-1 pb-2">
                <p className="font-medium text-gray-900">
                  {update.newStatus?.replaceAll("_", " ") ||
                    update.updateType?.replaceAll("_", " ") ||
                    "Case update"}
                </p>

                <p className="mt-1 text-sm leading-6 text-gray-600">
                  {update.message}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  {update.createdAt
                    ? formatDate(update.createdAt)
                    : "Date unavailable"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CaseTimeline;
