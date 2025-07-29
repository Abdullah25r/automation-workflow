import express from 'express'
import { getCheckoutInfo } from '../controllers/checkoutControllers.js';
const router = express.Router();
//routes
router.post("/", getCheckoutInfo)


export default router;