import { z } from 'zod';

const OrderZodSchema = z.object({
    email: z.string().nonempty("Email is required"),
    productId: z.string().nonempty("Product Id is required"),
    price: z.number().positive("Price must be greater than zero"),
    quantity: z.number().positive("Quantity must be greater than zero"),
    
  });

  export default OrderZodSchema;