
import { LoaderCircle } from "lucide-react";

export default function Loader({
  text = "Loading...",
  size = "md",
  fullScreen = false
}) {
  const sizes = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div
      className={`
        flex flex-col items-center justify-center gap-3
        ${fullScreen ? "min-h-screen bg-pinkBg" : "py-8"}
      `}
      role="status"
      aria-live="polite"
    >
      <LoaderCircle
        className={`
          ${sizes[size] || sizes.md}
          text-magenta animate-spin
        `}
      />

      {text && (
        <p className="text-sm font-medium text-plum">
          {text}
        </p>
      )}

      <span className="sr-only">Loading content</span>
    </div>
  );
}
