import { Router } from 'express';
import { OrderControllers } from './order.controller';

const router = Router();

router.post('/',OrderControllers.createOrder);
router.get('/',OrderControllers.getAllOrders);
router.get('/email',OrderControllers.getOrdersByEmail);

export const orderRoutes = router;
