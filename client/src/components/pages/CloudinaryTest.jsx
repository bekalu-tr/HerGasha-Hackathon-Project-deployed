
import { useState } from "react";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

export default function CloudinaryTest() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("tradeLicense", file);

    try {
      setLoading(true);
      setMessage("");
      setUploadedFile(null);

      const response = await fetch(
        `${API_BASE_URL}/cloudinary-test/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Upload failed");
      }

      setUploadedFile(data.file);
      setMessage("Your file was uploaded successfully!");
      setFile(null);
      e.target.reset();
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-green-800">
            Her Gasha
          </h1>

          <p className="mt-2 text-slate-500">
            Cloudinary Storage Test
          </p>
        </div>

        <form onSubmit={handleUpload} className="space-y-5">
          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Select a sample document
            </label>

            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full rounded-lg border border-slate-300 p-3"
            />

            <p className="mt-2 text-sm text-slate-500">
              PDF, JPG or PNG. Maximum size: 5 MB.
            </p>
          </div>

          {file && (
            <div className="rounded-lg bg-slate-100 p-3 text-sm">
              <p className="font-medium">{file.name}</p>
              <p className="text-slate-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !file}
            className="w-full rounded-lg bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Document"}
          </button>
        </form>

        {message && (
          <div className="mt-5 rounded-lg bg-slate-100 p-4 text-sm">
            {message}
          </div>
        )}

        {uploadedFile && (
          <div className="mt-5 rounded-lg border border-green-200 bg-green-50 p-4">
            <h2 className="font-bold text-green-800">
              Upload successful!
            </h2>

            <p className="mt-2 text-sm text-slate-700">
              File: {uploadedFile.originalName}
            </p>

            <p className="text-sm text-slate-700">
              Storage: Cloudinary
            </p>

            <p className="mt-2 break-all text-xs text-slate-500">
              Document ID: {uploadedFile.publicId}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
