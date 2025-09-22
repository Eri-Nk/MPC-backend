import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { createProductSchema } from "../validators/productValidator";

export async function listProducts(req: Request, res: Response) {
  const { category } = req.query;
  const where: any = {};

  if (category && typeof category === "string") {
    where.category = category;
  }
  try {
    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { variants: true }, // <- include variants too
    });

    res.json(products);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

export async function getProduct(req: Request, res: Response) {
  const id = req.params.id; // keep string
  if (!id) return res.status(400).json({ error: "Invalid id" });

  const product = await prisma.product.findUnique({
    where: { id },
    include: { variants: true }, // fetch variants too
  });

  if (!product) return res.status(404).json({ error: "Product not found" });

  res.json(product);
}

export async function createProduct(req: Request, res: Response) {
  // Validate body
  const parse = createProductSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.errors });
  }
  const data = parse.data;

  try {
    const created = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description ?? null,
        image: data.image ?? null,
        category: data.category,
        variants: {
          create: data.variants.map((variant: any) => ({
            name: variant.name,
            price: variant.price, // Decimal/Float
            inStock: variant.inStock ?? true,
          })),
        },
      },
      include: { variants: true }, // return product + variants
    });

    res.status(201).json(created);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Failed to create product" });
  }
}
