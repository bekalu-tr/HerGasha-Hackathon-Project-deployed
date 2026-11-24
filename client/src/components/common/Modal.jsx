
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  closeOnOverlay = true
}) {
  const sizes = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl"
  };

  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose?.();
      }
    }

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
      onMouseDown={(event) => {
        if (
          closeOnOverlay &&
          event.target === event.currentTarget
        ) {
          onClose?.();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`
          relative w-full ${sizes[size] || sizes.md}
          max-h-[90vh] overflow-y-auto
          bg-white rounded-2xl shadow-2xl
          animate-in fade-in zoom-in duration-200
        `}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2
            id="modal-title"
            className="text-xl font-bold text-plum"
          >
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 rounded-full text-gray-500 hover:bg-pinkBg hover:text-plum"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
