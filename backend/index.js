import express from "express";
import env from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import productDetailRoutes from './routes/productDetailRoutes.js'
env.config();
//serverside code
const app = express();
const PORT = process.env.PORT;
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   })
// );
const allowedOrigins = [
  "http://localhost:3000",           // for local dev
  "https://pods-store.vercel.app"   // for production
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // true if HTTPS
      httpOnly: true,
      maxAge: 24*60*60 * 1000, // 1 day
    },
  })
);

//routes
app.use("/api/products", productRoutes);
app.use("/api/productdetails",productDetailRoutes)
app.use("/api/admin", adminRoutes);
app.use("/api/checkout", checkoutRoutes);
app.listen(PORT, () => {
  console.log(`Server is listening on the port ${PORT}`);
});
