import { Product } from '../Product/product.model';
import { OrderService } from './order.service';
import OrderZodSchema from './order.zod.validation';
import { Request, Response } from 'express';

const createOrder = async (req: Request, res: Response) => {
  try {
    const OrderData = { ...req.body };
    const { productId, quantity } = OrderData as {
      productId: string;
      quantity: number;
    };
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }
    if (product.inventory.quantity < quantity) {
      return res
        .status(400)
        .json({
          success: false,
          message: 'Insufficient quantity available in inventory',
        });
    }
    product.inventory.quantity -= quantity;

    product.inventory.inStock = product.inventory.quantity > 0;

    await product.save();

    const zodParsedData = OrderZodSchema.parse(OrderData);

    const result = await OrderService.createOrderIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string | undefined;

    const result = await OrderService.getAllOrdersFromDB(email);
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      message: email
        ? 'Orders fetched successfully for user email!'
        : 'Orders fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(200).json({
      success: true,
      message: 'Something went wrong',
      error: err,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
