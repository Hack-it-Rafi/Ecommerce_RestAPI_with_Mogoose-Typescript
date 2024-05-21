import { z } from 'zod';

// Define the Zod schema for the Variant
const VariantZodSchema = z.object({
  type: z.string().nonempty("Type is required"),
  value: z.string().nonempty("Value is required"),
});

// Define the Zod schema for the Inventory
const InventoryZodSchema = z.object({
  quantity: z.number().min(0, "Quantity cannot be less than 0"),
  inStock: z.boolean(),
});

// Define the Zod schema for the Product
const ProductZodSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  price: z.number().positive("Price must be greater than zero"),
  category: z.string().nonempty("Category is required"),
  tags: z.array(z.string().nonempty("Tag cannot be empty")),
  variants: z.array(VariantZodSchema),
  inventory: InventoryZodSchema,
  isDeleted: z.boolean().default(false)
});

export default ProductZodSchema;