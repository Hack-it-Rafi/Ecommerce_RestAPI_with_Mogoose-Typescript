import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (orderData: TOrder) => {
  const order = new Order(orderData);
  const result = await order.save();
  return result;
};

const getAllOrdersFromDB = async (email?: string) => {
    if (email) {
      return await Order.find({ email });
    } else {
      return await Order.find();
    }
  };

export const OrderService = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
