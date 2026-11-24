
import { AlertCircle, X } from "lucide-react";

export default function ErrorMessage({
  message,
  onClose,
  title = "Something went wrong",
  variant = "error"
}) {
  if (!message) return null;

  const styles = {
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800"
  };

  return (
    <div
      role="alert"
      className={`
        flex items-start gap-3 p-4
        rounded-xl border
        ${styles[variant] || styles.error}
      `}
    >
      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />

      <div className="flex-1">
        <p className="font-semibold text-sm">
          {title}
        </p>

        <p className="mt-1 text-sm">
          {message}
        </p>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss message"
          className="p-1 rounded hover:bg-black/5"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
