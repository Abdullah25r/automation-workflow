import express from "express";
import { addProducts , deleteProduct, getProducts,updateProduct } from "../controllers/productController.js";
const router = express.Router();

router.get("/",getProducts)
router.post("/", addProducts);
router.delete("/:id", deleteProduct);
router.put("/:id",updateProduct);



export default router;
