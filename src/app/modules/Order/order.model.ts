import { Schema, model } from 'mongoose';
import { OrderModel, TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (props: { value: string }) =>
        `${props.value} is not a valid email!`,
    },
  },
  productId: {
    type: String,
    required: true,
    //   ref: 'Product', // Assuming you have a Product model
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative'],
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
  },
},{versionKey:false});

orderSchema.methods.isUserExists = async function (id: string) {
  const existOrder = await Order.findOne({ id });
  return existOrder;
};

export const Order = model<TOrder, OrderModel>('Order', orderSchema);
