import { Product } from './product.model';
import { TProduct } from './product.interface';
import mongoose from 'mongoose';

const createProductIntoDB = async (productData: TProduct) => {
  const product = new Product(productData);
  const result = await product.save();
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  // Convert the id string to ObjectId
  const objectId = new mongoose.Types.ObjectId(id);
  console.log(objectId);

  // Use the aggregate function with $match
  const result = await Product.aggregate([{ $match: { _id: objectId } }]);
//   console.log(result);

  return result;
};

export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
};
