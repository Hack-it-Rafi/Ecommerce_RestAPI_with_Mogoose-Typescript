import { Product } from './product.model';
import { TProduct } from './product.interface';
import mongoose from 'mongoose';

const createProductIntoDB = async (productData: TProduct) => {
  const product = new Product(productData);
  const result = await product.save();
  return result;
};

const getAllProductsFromDB = async (searchTerm?: string) => {
  if (searchTerm) {
    const regex = new RegExp(searchTerm, 'i');
    return await Product.find({
      $or: [{ name: regex }, { description: regex }, { category: regex }],
    });
  } else {
    return await Product.find();
  }
};

const getSingleProductFromDB = async (id: string) => {
  const objectId = new mongoose.Types.ObjectId(id);
  const result = await Product.aggregate([{ $match: { _id: objectId } }]);

  return result;
};

const updateProductFromDB = async (
  id: string,
  updateData: Partial<TProduct>,
) => {
  const objectId = new mongoose.Types.ObjectId(id);

  const result = await Product.findByIdAndUpdate(objectId, updateData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteProductFromDB = async (id: string) => {
  const objectId = new mongoose.Types.ObjectId(id);
  const result = await Product.deleteOne({ _id: objectId });
  return result;
};

export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
};
