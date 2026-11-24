import multer from "multer";

// Allowed file types
const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];

// Memory storage
const storage = multer.memoryStorage();

// Validate uploaded files
const fileFilter = (req, file, callback) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return callback(new Error("Only JPEG, PNG and PDF files are allowed"));
  }

  callback(null, true);
};

// Shared Multer configuration
const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB per file
    fields: 20,
    files: 3,
  },
});

// Report evidence upload: maximum 3 files
export const uploadEvidence = upload.array("evidence", 3);

// Organization trade license: exactly one file maximum
export const uploadTradeLicense = upload.single("tradeLicense");
