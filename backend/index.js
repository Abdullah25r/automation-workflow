import express from "express";
import env from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import productRoutes from './routes/productRoutes.js'
env.config();
//serverside code
const app = express();
const PORT = process.env.PORT;
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));


//routes
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on the port ${PORT}`);
});
