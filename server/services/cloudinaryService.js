import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";

export const uploadTradeLicenseToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.buffer) {
      return reject(new Error("Trade license file is required"));
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        type: "authenticated",
        folder: "her-gasha/trade-licenses",
        public_id: `${Date.now()}-${file.originalname
          .replace(/\.[^/.]+$/, "")
          .replace(/[^a-zA-Z0-9_-]/g, "-")}`,
        format:
          file.mimetype === "application/pdf"
            ? "pdf"
            : file.mimetype === "image/png"
              ? "png"
              : "jpg",
        access_mode: "authenticated",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve({
          publicId: result.public_id,
          resourceType: result.resource_type,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
        });
      },
    );

    Readable.from(file.buffer).pipe(uploadStream);
  });
};
