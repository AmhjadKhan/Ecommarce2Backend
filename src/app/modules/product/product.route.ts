import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/api/products', ProductControllers.createProduct);

router.get('/api/products', ProductControllers.getAllProducts);

router.get('/api/products/:productId', ProductControllers.getProductById);

router.put('/api/products/:productId', ProductControllers.updateProductById);

router.delete('/api/products/:productId', ProductControllers.deleteProductById);

router.get('/api/products/search', ProductControllers.searchProducts);


export const ProductRoutes = router;
