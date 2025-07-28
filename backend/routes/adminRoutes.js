import express from 'express'
import { loginAdmin,getDashboardData } from '../controllers/adminController.js';
const router = express.Router();

router.post('/', loginAdmin);
router.get('/dashboard-data', getDashboardData);
export default router