import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import opportunityRoutes from "./routes/opportunityRoutes.js";
import supportRoutes from "./routes/supportRoutes.js";

// Import error middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

// Trust Render's reverse proxy so X-Forwarded-For and express-rate-limit work properly
app.set("trust proxy", 1);

const allowedOrigins = [
  "https://her-gasha-client.onrender.com",
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

// 1. Security middleware
app.use(helmet());

// 2. CORS configuration
app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser/same-origin requests with no Origin header
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
  }),
);

// 3. Parse incoming requests
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// 4. Parse cookies
app.use(cookieParser());

// 5. General API rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use("/api", apiLimiter);

// 6. Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Her Gasha API",
    version: "1.0.0",
    documentation: "/api/health",
  });
});

// 7. Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Her Gasha API is running",
    timestamp: new Date().toISOString(),
  });
});

// 8. Favicon handler
app.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});

// 9. API routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/users", userRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/support", supportRoutes);

// 10. Handle unknown routes
app.use(notFound);

// 11. Global error handler
app.use(errorHandler);

export default app;
