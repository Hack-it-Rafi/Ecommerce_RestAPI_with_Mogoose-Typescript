import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (orderData: TOrder) => {
    const order = new Order(orderData);
    const savedOrder = await order.save();
  
    const result = await Order.aggregate([
      { $match: { _id: savedOrder._id } },
      {
        $project: {
          _id: 1,
          email:1,
          productId:1,
          price:1,
          quantity:1
        },
      },
    ]);
  
    if (result.length === 0) {
      return null;
    }
    return result[0];
};

const getAllOrdersFromDB = async (email?: string) => {
    const query = email ? { email } : {};
  
    const orders = await Order.find(query).select({
        _id: 1,
        email:1,
        productId:1,
        price:1,
        quantity:1
    });
  
    return orders;
  };

export const OrderService = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
