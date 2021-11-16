import mongoose, { Document } from "mongoose";

export type Categories = "T-Shirts" | "Pants" | "Shoes" | "Jackets";

export type ProductDocument = Document & {
  name: string;
  description: string;
  categories: Categories;
  sizes: string[];
  price: number;
  img: string[];
};

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    uppercase: true,
  },
  description: {
    type: String,
    required: true,
  },
  categories: String,
  sizes: {
    type: Array,
    default: ["XS", "S", "M", "L", "XL"],
  },
  price: {
    type: Number,
    required: true,
  },
  img: [String],
});

export default mongoose.model<ProductDocument>("Product", productSchema);
