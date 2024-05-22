import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/Product/product.route';
import { OrderRoutes } from './app/modules/Order/order.route';
const app: Application = express();
// const port = 3000

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send("Go to '/api/products' for products, '/api/orders' for orders");
});

app.all('*', (req: Request, res: Response) => {
    res.status(400).json({
      success: false,
      message: 'Route not found',
    });
  });

export default app;
