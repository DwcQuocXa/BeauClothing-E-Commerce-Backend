import { Request, Response, NextFunction } from "express";

import Product, { ProductDocument } from "../models/Product";
import ProductService from "../services/product";
import { NotFoundError } from "../helpers/apiError";

// POST /products
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, categories, sizes, price, img } = req.body;

    const newProduct: ProductDocument = new Product({
      name,
      description,
      categories,
      sizes,
      price,
      img,
    });

    await ProductService.create(newProduct);
    res.json(newProduct);
  } catch (error) {
    next(new NotFoundError("Product not found", error));
  }
};

// PUT /products/:productId
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body;
    const productId = req.params.productId;
    const updateProduct = await ProductService.update(productId, update);
    res.json(updateProduct);
  } catch (error) {
    next(new NotFoundError("Product not found", error));
  }
};

// DELETE /products/:productId
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ProductService.deleteProduct(req.params.productId);
    res.status(204).end();
  } catch (error) {
    next(new NotFoundError("Product not found", error));
  }
};

// GET /products/:productId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ProductService.findById(req.params.productId));
  } catch (error) {
    next(new NotFoundError("Product not found", error));
  }
};

// GET /products
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ProductService.findAll());
  } catch (error) {
    next(new NotFoundError("Product not found", error));
  }
};
