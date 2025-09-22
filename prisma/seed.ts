import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.create({
    data: {
      name: "T-Shirt",
      slug: "t-shirt",
      category: "apparel",
      image:
        "https://www.naijafootstore.com/cdn/shop/products/Plain_Black_1024x1024.jpg?v=1567094532g",
      variants: {
        create: [
          { name: "Small", price: 19.99, inStock: true },
          { name: "Medium", price: 21.99, inStock: false },
          { name: "Large", price: 23.99, inStock: true },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Boots",
      slug: "boots",
      category: "footwear",
      image:
        "https://res.cloudinary.com/dtc2q8arn/image/upload/v1756888367/BATCH%2013/BATCH%2013/ID9052/ID9052_12_FOOTWEAR_Photography_Left_Side_Center_Lateral_View_grey_sbvy74.jpg",
      variants: {
        create: [
          { name: "Small", price: 60.99, inStock: false },
          { name: "Medium", price: 88.99, inStock: false },
          { name: "Large", price: 100.99, inStock: true },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Jerseys",
      slug: "jerseys",
      category: "apparel",
      image: "https://i1.adis.ws/i/ArsenalDirect/tji9529_f?$pdpMainZoomImage$",
      variants: {
        create: [
          { name: "Small", price: 50.99, inStock: true },
          { name: "Medium", price: 60.99, inStock: false },
          { name: "Large", price: 88.99, inStock: true },
        ],
      },
    },
  });

  console.log(" Seeded 3 products with variants");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
