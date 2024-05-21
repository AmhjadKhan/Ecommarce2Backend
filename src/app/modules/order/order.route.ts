import { Router } from 'express';
import { createOrder, getAllOrders, getOrdersByEmail } from './order.controller';

const router = Router();

router.post('/orders', createOrder);
router.get('/orders', getAllOrders);
router.get('/orders/email', getOrdersByEmail);

export default router;
