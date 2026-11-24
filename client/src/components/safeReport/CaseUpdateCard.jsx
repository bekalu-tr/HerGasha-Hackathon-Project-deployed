
import { Clock, MessageSquare, ShieldCheck } from "lucide-react";

const CaseUpdateCard = ({ update }) => {
  if (!update) return null;

  const date = update.createdAt
    ? new Date(update.createdAt).toLocaleString()
    : "Date unavailable";

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-green-50 p-2 text-green-700">
            <MessageSquare size={19} />
          </div>

          <div>
            <h3 className="font-semibold capitalize text-gray-900">
              {(update.updateType || "general").replaceAll("_", " ")}
            </h3>
            <p className="text-xs text-gray-500">
              Case activity
            </p>
          </div>
        </div>

        {update.isConfidential && (
          <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs text-amber-700">
            <ShieldCheck size={13} />
            Confidential
          </span>
        )}
      </div>

      <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-gray-700">
        {update.message}
      </p>

      {update.newStatus && (
        <p className="mt-3 text-sm text-gray-600">
          New status:{" "}
          <span className="font-semibold capitalize text-green-700">
            {update.newStatus.replaceAll("_", " ")}
          </span>
        </p>
      )}

      <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-3 text-xs text-gray-400">
        <Clock size={14} />
        {date}
      </div>
    </article>
  );
};

export default CaseUpdateCard;
