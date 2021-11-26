import express, { Router } from "express";

import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product";

const router = express.Router();

//router.put('/', banOrUnbanUser)

router.put("products/:productId", updateProduct);
router.delete("products/:productId", deleteProduct);
router.post("products/", createProduct);

export default router;
