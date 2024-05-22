import { z } from 'zod';

const VariantZodSchema = z.object({
  type: z.string().nonempty('Type is required'),
  value: z.string().nonempty('Value is required'),
});

const InventoryZodSchema = z.object({
  quantity: z.number().min(0, 'Quantity cannot be less than 0'),
  inStock: z.boolean(),
});

const ProductZodSchema = z.object({
  name: z.string().nonempty('Name is required'),
  description: z.string().nonempty('Description is required'),
  price: z.number().positive('Price must be greater than zero'),
  category: z.string().nonempty('Category is required'),
  tags: z.array(z.string().nonempty('Tag cannot be empty')),
  variants: z.array(VariantZodSchema),
  inventory: InventoryZodSchema,
  isDeleted: z.boolean().default(false),
});

export default ProductZodSchema;
