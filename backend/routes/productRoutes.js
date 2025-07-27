import express from "express";
import { addProducts , deleteProduct, getProducts } from "../controllers/productController.js";
const router = express.Router();

router.get("/",getProducts)
router.post("/addproducts", addProducts);
router.delete("/:id", deleteProduct);
// router.put("/:id",updateProduct);



export default router;
