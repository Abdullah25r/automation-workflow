import express from "express";
import env from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import productDetailRoutes from "./routes/productDetailRoutes.js";

// Load environment variables from .env file for local development
env.config();

const app = express();
const PORT = process.env.PORT || 3001; // Use Railway's port or default to 3001

// Define allowed origins for CORS. This is secure and explicit.
const allowedOrigins = [
  "http://localhost:3000", // For your local development (if you use this port)
  "https://pods-store.vercel.app", // Your Vercel production frontend
  // You can add more Vercel preview domains here if needed
];

// Essential middleware for a production server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

// Trust the proxy (Railway's load balancer) for secure cookies
app.set("trust proxy", 1);

// CORS middleware configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Session middleware for secure session management
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // MUST be true for production HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: 'none'
    },
  })
);

// Routes
app.use("/api/products", productRoutes);
app.use("/api/productdetails", productDetailRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/checkout", checkoutRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on the port ${PORT}`);
});