import express, { Request, Response, Application } from 'express';
const app: Application = express();
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.route';
import { orderRoutes } from './app/modules/order/order.route';
// const port = 3000;

// parsers
app.use(express.json());
app.use(cors());

app.use('/api/products', ProductRoutes)

app.use('/api/orders', orderRoutes)



app.get('/', (req: Request, res: Response) => {
  res.send('my eCommare port is running1y ttt'); 
});

export default app;
