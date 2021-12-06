import request from "supertest";
import { Request, Response, NextFunction } from "express";
import { ProductDocument } from "../../src/models/Product";
import app from "../../src/app";
import connect, { MongodHelper } from "../db-helper";

const nonExistingProductId = "5e57b77b5744fa0b461c7906";

async function createProduct(override?: Partial<ProductDocument>) {
  let product = {
    name: "RELAXED FIT MOTIF-DETAIL HOODIE",
    description:
      "Smiley® x H&M. Hoodie in sweatshirt fabric with a motif front and back and a soft brushed inside. Relaxed fit with a lined, wrapover, drawstring hood, kangaroo pocket, dropped shoulders, long sleeves and ribbing at the cuffs and hem.",
    categories: "T-Shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    price: 24.99,
    img: [
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fc7%2F79%2Fc779f00ea678411e215159fe67ee9790b4effa36.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]",
    ],
  };

  if (override) {
    product = { ...product, ...override };
  }

  return await request(app).post("/api/v1/products").send(product);
}

describe("product controller", () => {
  let mongodHelper: MongodHelper;
  beforeEach(async () => {
    mongodHelper = await connect();
  });

  afterEach(async () => {
    await mongodHelper.clearDatabase();
  });

  afterAll(async () => {
    await mongodHelper.closeDatabase();
  });

  it("should create a product", async () => {
    const res = await createProduct();
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe("RELAXED FIT MOTIF-DETAIL HOODIE");
  });

  it("should get back an existing product", async () => {
    let res = await createProduct();
    expect(res.status).toBe(200);

    const productId = res.body._id;
    res = await request(app).get(`/api/v1/products/${productId}`);

    expect(res.body._id).toEqual(productId);
  });

  it("should not get back a non-existing product", async () => {
    const res = await request(app).get(
      `/api/v1/products/${nonExistingProductId}`
    );
    expect(res.status).toBe(404);
  });

  it("should get back all product", async () => {
    const res1 = await createProduct({
      name: "RELAXED JACKET",
      price: 110,
    });
    const res2 = await createProduct({
      name: "FIT PANTS",
      price: 32,
    });

    const res3 = await request(app).get("/api/v1/products");

    expect(res3.body.length).toEqual(2);
    expect(res3.body[0]._id).toEqual(res2.body._id);
    expect(res3.body[1]._id).toEqual(res1.body._id);
  });

  it("should update an existing product", async () => {
    let res = await createProduct();
    expect(res.status).toBe(200);

    const productId = res.body._id;
    const update = {
      name: "RELAXED JACKET",
      price: 110,
    };

    res = await request(app).put(`/api/v1/products/${productId}`).send(update);

    expect(res.status).toEqual(200);
    expect(res.body.name).toEqual("RELAXED JACKET");
    expect(res.body.price).toEqual(110);
  });

  it("should delete an existing product", async () => {
    let res1 = await createProduct();
    expect(res1.status).toBe(200);
    const productId = res1.body._id;

    let res2 = await request(app).delete(`/api/v1/products/${productId}`);

    expect(res2.status).toEqual(204);

    let res3 = await request(app).get(`/api/v1/products/${productId}`);
    expect(res3.status).toBe(404);
  });
});
