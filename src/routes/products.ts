import { Router } from "express";
import {
  listProducts,
  getProduct,
  createProduct,
} from "../controllers/productsController";

const router = Router();

router.get("/", listProducts);

router.get("/:id", getProduct);

router.post("/", createProduct);

export default router;
