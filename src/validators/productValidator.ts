import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  category: z.string(),
  variants: z.array(
    z.object({
      name: z.string(),
      price: z.number(),       // variants have their own price
      inStock: z.boolean().optional().default(true),
    })
  ),
});


export type CreateProductInput = z.infer<typeof createProductSchema>;
