import express from 'express'
import { loginAdmin,getDashboardData,logoutAdmin,getAllCustomers } from '../controllers/adminController.js';
import { getAllOrders, getAdminOrderDetail, dispatchOrder } from '../controllers/adminOrderController.js';
import { getDashboardStats } from '../controllers/adminDashboardController.js';
const router = express.Router();

router.get('/dashboard-data', getDashboardData);
router.get('/dashboard-stats', getDashboardStats)
router.get('/orders', getAllOrders)
router.get('/orders/:id', getAdminOrderDetail)
router.get('/customers', getAllCustomers); 
router.post('/', loginAdmin);
router.post('/logout', logoutAdmin)
router.put('/orders/:orderId/dispatch', dispatchOrder);

export default router