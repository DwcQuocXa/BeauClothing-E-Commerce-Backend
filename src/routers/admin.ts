import express, { Router } from "express";
import { banOrUnbanUser } from "../controllers/user";

import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product";

const router = express.Router();

router.put("/users/ban", banOrUnbanUser);

router.post("/products", createProduct);
router.put("/products/:productId", updateProduct);
router.delete("/products/:productId", deleteProduct);

export default router;
