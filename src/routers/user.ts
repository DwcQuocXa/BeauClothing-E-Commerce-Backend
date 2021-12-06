import express, { Response, Request } from "express";
import passport from "passport";

import {
  findAll,
  getCart,
  manageProductInCart,
  removeProductInCart,
} from "../controllers/user";

const router = express.Router();

router.get("/", findAll);

router.get("/cart", getCart);
router.put("/cart", manageProductInCart);
router.delete("/cart", removeProductInCart);

export default router;
