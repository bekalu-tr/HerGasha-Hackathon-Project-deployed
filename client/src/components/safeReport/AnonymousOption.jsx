
import { ShieldCheck, UserRound, EyeOff } from "lucide-react";

const AnonymousOption = ({ value = "anonymous", onChange }) => {
  const options = [
    {
      value: "anonymous",
      title: "Report anonymously",
      description:
        "Do not include your name in the report. You will need a secure way to access your case later.",
      icon: EyeOff,
    },
    {
      value: "identified",
      title: "Report with my identity",
      description:
        "Share your identity with authorized case handlers when necessary.",
      icon: UserRound,
    },
  ];

  return (
    <section className="space-y-3">
      <div>
        <h3 className="font-semibold text-gray-900">
          Choose your privacy option
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          You decide whether to include your identity.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const Icon = option.icon;
          const selected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange?.(option.value)}
              aria-pressed={selected}
              className={`rounded-xl border p-4 text-left transition ${
                selected
                  ? "border-green-600 bg-green-50 ring-2 ring-green-100"
                  : "border-gray-200 bg-white hover:border-green-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={
                    selected ? "text-green-700" : "text-gray-500"
                  }
                  size={22}
                />
                <span className="font-semibold text-gray-900">
                  {option.title}
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {option.description}
              </p>

              <span className="mt-3 block text-xs font-semibold text-green-700">
                {selected ? "Selected" : "Select this option"}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex gap-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
        <ShieldCheck size={20} className="shrink-0" />
        <p>
          Anonymous reporting must be supported by the backend. Do not
          enter your name or identifying details in the report description
          if you want to remain anonymous.
        </p>
      </div>
    </section>
  );
};

export default AnonymousOption;
