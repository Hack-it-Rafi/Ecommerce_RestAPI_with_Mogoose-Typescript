import { Request, Response } from 'express';
import { ProductService } from './product.service';
import ProductZodSchema from './product.zod.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = { ...req.body };
    const zodParsedData = ProductZodSchema.parse(productData);

    const result = await ProductService.createProductIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
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

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;

    const result = await ProductService.getAllProductsFromDB(searchTerm);

    res.status(200).json({
        success: true,
        message: searchTerm
          ? `Products matching search term '${searchTerm}' fetched successfully!`
          : 'Products fetched successfully!',
        data: result,
      });;
  } catch (err) {
    res.status(200).json({
      success: true,
      message: 'Something went wrong',
      error: err,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
  
      const result = await ProductService.getSingleProductFromDB(productId);
  
      res.status(200).json({
        success: true,
        message: 'Product fetched successfully!',
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

  const updateProduct = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const updateData = req.body;
  
      const result = await ProductService.updateProductFromDB(productId, updateData);
  
      res.status(200).json({
        success: true,
        message: "Product updated successfully!",
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

  const deleteProduct = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
  
      const result = await ProductService.deleteProductFromDB(productId);
  
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
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

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
