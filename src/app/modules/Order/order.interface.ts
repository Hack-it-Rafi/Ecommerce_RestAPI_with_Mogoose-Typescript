import { Model } from "mongoose";

export type TOrder = {
  email: string;
  productId: string;
  price: number;
  quantity: number;
};

export type OrderMethods = {
  isUserExists(id: string): Promise<TOrder | null>;
};

export type OrderModel = Model<
  TOrder,
  Record<string, never>,
  OrderMethods
>;
