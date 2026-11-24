export const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);

  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  let statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  let message = err.message || "Internal server error";

  // MongoDB duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    message = "This information already exists";
  }

  // MongoDB validation error
  if (err.name === "ValidationError") {
    statusCode = 400;

    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  // Invalid MongoDB ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource ID";
  }

  // Log detailed error on the server
  console.error("Application Error:", err);

  res.status(statusCode).json({
    success: false,
    message: statusCode >= 500 ? "Internal server error" : message,

    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};
