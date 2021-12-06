import Product from "../../src/models/Product";
import ProductService from "../../src/services/product";
import connect, { MongodHelper } from "../db-helper";
//import "@types/jest";

const nonExistingProductId = "5e57b77b5744fa0b461c7906";

async function createProduct() {
  const product = new Product({
    name: "RELAXED FIT MOTIF-DETAIL HOODIE",
    description:
      "Smiley® x H&M. Hoodie in sweatshirt fabric with a motif front and back and a soft brushed inside. Relaxed fit with a lined, wrapover, drawstring hood, kangaroo pocket, dropped shoulders, long sleeves and ribbing at the cuffs and hem.",
    categories: "T-Shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    price: 24.99,
    img: "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fc7%2F79%2Fc779f00ea678411e215159fe67ee9790b4effa36.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]",
  });
  return await ProductService.create(product);
}
describe("product service", () => {
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
    const product = await createProduct();
    expect(product).toHaveProperty("_id");
    expect(product).toHaveProperty("name", "RELAXED FIT MOTIF-DETAIL HOODIE");
    expect(product).toHaveProperty("price", 24.99);
  });

  it("should get a product with id", async () => {
    const product = await createProduct();
    const found = await ProductService.findById(product._id);
    expect(found.name).toEqual(product.name);
    expect(found._id).toEqual(product._id);
  });

  it("should get a list of all products", async () => {
    const product = await createProduct();
    const found = await ProductService.findAll();
    expect(found.length).toEqual(1);
    expect(found[0]._id).toEqual(product._id);
  });

  it("should not get a non-existing product", async () => {
    expect.assertions(1);
    return ProductService.findById(nonExistingProductId).catch((e) => {
      expect(e.message).toMatch(`Product ${nonExistingProductId} is not found`);
    });
  });

  it("should update an existing product", async () => {
    const product = await createProduct();
    const update = {
      name: "RELAXED FIT MOTIF-DETAIL JACKET",
      price: 110,
    };
    const updated = await ProductService.update(product._id, update);
    expect(updated).toHaveProperty("_id", product._id);
    expect(updated).toHaveProperty("name", "RELAXED FIT MOTIF-DETAIL JACKET");
    expect(updated).toHaveProperty("price", 110);
  });

  it("should not update a non-existing movie", async () => {
    expect.assertions(1);
    const update = {
      name: "RELAXED FIT MOTIF-DETAIL JACKET",
      price: 110,
    };
    return ProductService.update(nonExistingProductId, update).catch((e) => {
      expect(e.message).toMatch(`Product ${nonExistingProductId} is not found`);
    });
  });

  it("should delete an existing product", async () => {
    expect.assertions(1);
    const product = await createProduct();
    await ProductService.deleteProduct(product._id);
    return ProductService.findById(product._id).catch((e) => {
      expect(e.message).toBe(`Product ${product._id} is not found`);
    });
  });
});
