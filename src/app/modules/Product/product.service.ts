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
  const objectId = new mongoose.Types.ObjectId(id);
  const result = await Product.aggregate([{ $match: { _id: objectId } }]);

  return result;
};

const updateProductFromDB = async (id: string, updateData: Partial<TProduct>) => {
    try {
      // Convert the id string to ObjectId
      const objectId = new mongoose.Types.ObjectId(id);
  
      // Use findByIdAndUpdate to update the product information
      const result = await Product.findByIdAndUpdate(objectId, updateData, { new: true, runValidators: true });
  
      return result;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductFromDB
};
