
import { useState } from "react";
import { ShieldAlert, X } from "lucide-react";

const QuickExit = () => {
  const [showWarning, setShowWarning] = useState(false);

  const handleQuickExit = () => {
    // Replace the current page with a neutral website.
    window.location.replace("https://www.google.com/");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowWarning(true)}
        className="
          fixed bottom-5 right-5 z-[9999]
          flex items-center gap-2
          rounded-full bg-red-600
          px-5 py-3 text-sm font-semibold
          text-white shadow-lg
          transition hover:bg-red-700
          focus:outline-none focus:ring-4
          focus:ring-red-300
        "
        aria-label="Quick exit"
      >
        <ShieldAlert size={20} />
        Quick Exit
      </button>

      {showWarning && (
        <div
          className="
            fixed inset-0 z-[10000]
            flex items-center justify-center
            bg-black/60 p-4
          "
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-exit-title"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2
                id="quick-exit-title"
                className="text-lg font-bold text-gray-900"
              >
                Leave this website?
              </h2>

              <button
                type="button"
                onClick={() => setShowWarning(false)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mb-6 text-sm leading-6 text-gray-600">
              You are about to leave Her Gasha and open a neutral website.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowWarning(false)}
                className="
                  flex-1 rounded-lg border border-gray-300
                  px-4 py-2.5 text-sm font-semibold
                  text-gray-700 hover:bg-gray-100
                "
              >
                Stay here
              </button>

              <button
                type="button"
                onClick={handleQuickExit}
                className="
                  flex-1 rounded-lg bg-red-600
                  px-4 py-2.5 text-sm font-semibold
                  text-white hover:bg-red-700
                "
              >
                Exit now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickExit;
