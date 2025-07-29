import express from "express";
import { getSpecificProduct } from "../controllers/productController.js";
const router = express.Router()

//routes
router.get("/:id", getSpecificProduct)

export default router