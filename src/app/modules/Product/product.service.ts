import { Product } from './product.model';
import { TProduct } from './product.interface';
import mongoose from 'mongoose';

const createProductIntoDB = async (productData: TProduct) => {
  const product = new Product(productData);
  const savedProduct = await product.save();

  const result = await Product.aggregate([
    { $match: { _id: savedProduct._id } },
    {
      $project: {
        _id: 0,
        name: 1,
        description: 1,
        price: 1,
        category: 1,
        tags: 1,
        variants: {
          type: 1,
          value: 1,
        },
        inventory: {
          quantity: 1,
          inStock: 1,
        },
      },
    },
  ]);

  if (result.length === 0) {
    return null;
  }
  return result[0];
};

const getAllProductsFromDB = async (searchTerm?: string) => {
  const matchStage = searchTerm
    ? {
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
          { tags: { $regex: searchTerm, $options: 'i' } },
        ],
      }
    : {};

  const pipeline = [
    { $match: matchStage },
    {
      $project: {
        _id: 0,
        name: 1,
        description: 1,
        price: 1,
        category: 1,
        tags: 1,
        variants: {
          type: 1,
          value: 1,
        },
        inventory: {
          quantity: 1,
          inStock: 1,
        },
      },
    },
  ];

  return await Product.aggregate(pipeline);
};

const getSingleProductFromDB = async (id: string) => {
  const objectId = new mongoose.Types.ObjectId(id);
  const result = await Product.aggregate([
    { $match: { _id: objectId } },
    {
      $project: {
        _id: 0,
        name: 1,
        description: 1,
        price: 1,
        category: 1,
        tags: 1,
        variants: {
          type: 1,
          value: 1,
        },
        inventory: {
          quantity: 1,
          inStock: 1,
        },
      },
    },
  ]);

  if (result.length === 0) {
    return null;
  }
  return result[0];
};

const updateProductFromDB = async (
  id: string,
  updateData: Partial<TProduct>,
) => {
  const objectId = new mongoose.Types.ObjectId(id);

  await Product.findByIdAndUpdate(objectId, updateData, {
    new: true,
    runValidators: true,
  });

  const result = await Product.aggregate([
    { $match: { _id: objectId } },
    {
      $project: {
        _id: 0,
        name: 1,
        description: 1,
        price: 1,
        category: 1,
        tags: 1,
        variants: {
          type: 1,
          value: 1,
        },
        inventory: {
          quantity: 1,
          inStock: 1,
        },
      },
    },
  ]);

  if (result.length === 0) {
    return null;
  }
  return result[0];
};
const deleteProductFromDB = async (id: string) => {
  const objectId = new mongoose.Types.ObjectId(id);
  await Product.deleteOne({ _id: objectId });
  return null;
};

export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
};
