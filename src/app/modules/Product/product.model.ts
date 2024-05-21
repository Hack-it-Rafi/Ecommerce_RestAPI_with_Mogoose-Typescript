import { Schema, model } from 'mongoose';
import { ProductMethods, ProductModel, TInventory, TProduct, TVariant } from './product.interface';

// Define the Variant schema
const VariantSchema = new Schema<TVariant>({
  type: { type: String, required: true },
  value: { type: String, required: true }
});

// Define the Inventory schema
const InventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true }
});

// Define the Product schema
const ProductSchema = new Schema<TProduct,ProductModel,ProductMethods>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [VariantSchema], required: true },
  inventory: { type: InventorySchema, required: true }
});

ProductSchema.methods.isUserExists  = async function(id:string){
    const existProduct = await Product.findOne({id});
    return existProduct;
}

export const Product = model<TProduct, ProductModel>('Product', ProductSchema);