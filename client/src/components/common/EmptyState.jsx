
import { FileQuestion } from "lucide-react";

export default function EmptyState({
  title = "Nothing here yet",
  description = "There is currently no information to display.",
  icon: Icon = FileQuestion,
  action,
  actionLabel = "Get Started"
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6 bg-pinkBg/60 rounded-2xl border border-dashed border-pink-200">
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-sm mb-4">
        <Icon className="w-8 h-8 text-magenta" />
      </div>

      <h3 className="text-lg font-bold text-plum">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm text-gray-600">
        {description}
      </p>

      {action && (
        <button
          type="button"
          onClick={action}
          className="mt-5 px-5 py-2.5 rounded-xl bg-magenta text-white font-semibold hover:bg-plum transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
