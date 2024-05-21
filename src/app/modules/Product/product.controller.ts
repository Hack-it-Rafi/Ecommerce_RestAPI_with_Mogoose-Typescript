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
      message: 'Product created successfully',
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
        message: 'Products retrieved successfully',
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
    getAllProducts
}
