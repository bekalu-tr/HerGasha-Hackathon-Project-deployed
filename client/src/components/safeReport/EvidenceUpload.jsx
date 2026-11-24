
import { useState } from "react";
import { Upload, FileText, Image, X, AlertCircle } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
];

const EvidenceUpload = ({
  files = [],
  onChange,
  maxFiles = 3,
}) => {
  const [error, setError] = useState("");

  const handleFiles = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    setError("");

    const validFiles = [];

    for (const file of selectedFiles) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError("Only JPEG, PNG and PDF files are allowed.");
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError(`${file.name} exceeds the 5 MB limit.`);
        continue;
      }

      validFiles.push(file);
    }

    const combined = [...files, ...validFiles];

    if (combined.length > maxFiles) {
      setError(`You can upload a maximum of ${maxFiles} files.`);
      event.target.value = "";
      return;
    }

    onChange?.(combined);
    event.target.value = "";
  };

  const removeFile = (index) => {
    onChange?.(files.filter((_, i) => i !== index));
    setError("");
  };

  return (
    <section className="space-y-3">
      <div>
        <h3 className="font-semibold text-gray-900">
          Supporting evidence
          <span className="ml-2 text-sm font-normal text-gray-400">
            Optional
          </span>
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Upload relevant images or PDF documents if you feel safe doing so.
        </p>
      </div>

      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition hover:border-green-500 hover:bg-green-50">
        <Upload className="mb-3 text-green-700" size={30} />

        <span className="font-semibold text-gray-800">
          Choose files to upload
        </span>

        <span className="mt-1 text-xs text-gray-500">
          JPEG, PNG or PDF · Maximum 5 MB per file · Up to {maxFiles} files
        </span>

        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          multiple
          onChange={handleFiles}
          className="sr-only"
        />
      </label>

      {error && (
        <p className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle size={17} />
          {error}
        </p>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                {file.type.startsWith("image/") ? (
                  <Image className="shrink-0 text-green-700" />
                ) : (
                  <FileText className="shrink-0 text-red-600" />
                )}

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-800">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeFile(index)}
                aria-label={`Remove ${file.name}`}
                className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs leading-5 text-gray-500">
        Do not upload evidence that could put you or another person at risk.
        Files are not securely stored merely by selecting them here.
      </p>
    </section>
  );
};

export default EvidenceUpload;
