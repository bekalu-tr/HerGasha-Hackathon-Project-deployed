
import { forwardRef } from "react";

const Input = forwardRef(function Input(
  {
    label,
    name,
    type = "text",
    placeholder = "",
    value,
    onChange,
    error,
    required = false,
    disabled = false,
    icon: Icon,
    className = "",
    ...props
  },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-semibold text-plum"
        >
          {label}

          {required && (
            <span className="ml-1 text-magenta">*</span>
          )}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          />
        )}

        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`
            w-full px-4 py-3
            ${Icon ? "pl-12" : ""}
            rounded-xl border
            ${error ? "border-red-500" : "border-gray-300"}
            bg-white text-bodyText
            placeholder:text-gray-400
            focus:outline-none
            focus:ring-2 focus:ring-magenta
            focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            transition-all
            ${className}
          `}
          {...props}
        />
      </div>

      {error && (
        <p
          id={`${name}-error`}
          role="alert"
          className="mt-2 text-sm text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
