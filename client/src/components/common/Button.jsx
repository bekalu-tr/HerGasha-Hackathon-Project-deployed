
import { LoaderCircle } from "lucide-react";

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-magenta text-white hover:bg-plum focus:ring-magenta",

    secondary:
      "bg-plum text-white hover:bg-purple focus:ring-plum",

    outline:
      "border-2 border-plum text-plum hover:bg-pinkBg focus:ring-plum",

    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",

    ghost:
      "text-plum hover:bg-pinkBg focus:ring-plum"
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-7 py-4 text-lg"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <LoaderCircle className="w-5 h-5 animate-spin" />
      )}

      {children}
    </button>
  );
}
