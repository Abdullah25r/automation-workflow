import express from "express";
import env from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
env.config();
//serverside code
const app = express();
const PORT = process.env.PORT;
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: "superSecretSessionKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true if HTTPS
      httpOnly: true,
      maxAge: 60 * 1000, // 1 day
    },
  })
);

//routes
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/checkout", checkoutRoutes);
app.listen(PORT, () => {
  console.log(`Server is listening on the port ${PORT}`);
});
