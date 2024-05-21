import { Product } from "./product.model";
import { TProduct } from "./product.interface";

const createProductIntoDB = async(productData:TProduct)=>{
    const product = new Product(productData);
    const result = await product.save();
    return result;
}

export const ProductService = {
    createProductIntoDB,
}