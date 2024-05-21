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
    const result = await ProductService.getAllProductsFromDB();

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
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

const getSingleProduct = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
    //   console.log(productId);
  
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

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct
};
