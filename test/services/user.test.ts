import User from "../../src/models/User";
import Product from "../../src/models/Product";
import UserService from "../../src/services/user";
import ProductService from "../../src/services/product";
import connect, { MongodHelper } from "../db-helper";

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

async function createUser() {
  const user = new User({
    firstName: "Duc",
    lastName: "Ngo",
    email: "random@gmail.com",
    password: "randompassword",
    cart: [],
  });
  return await User.create(user);
}

describe("user service", () => {
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

  it("should create an user", async () => {
    const user = await createUser();
    expect(user).toHaveProperty("_id");
    expect(user).toHaveProperty("email", "random@gmail.com");
    expect(user).toHaveProperty("firstName", "Duc");
  });

  it("should get a list of all users", async () => {
    const user = await createUser();
    const found = await UserService.findAll();
    expect(found.length).toEqual(1);
    expect(found[0]._id).toEqual(user._id);
  });

  it("should get the cart", async () => {
    const product = await createProduct();
    expect(product).toHaveProperty("_id");

    const user = await createUser();
    const foundedUser = await UserService.getCart(user._id);
    expect(foundedUser).toHaveProperty("_id");

    await UserService.addProductToCart(product.id, foundedUser.id);

    const updateUser = await UserService.getCart(user.id);
    expect(updateUser.cart.length).toEqual(1);
    expect(updateUser.cart[0].product).toHaveProperty("_id");
  });

  it("should increase the quantity of product in cart", async () => {
    const product = await createProduct();
    expect(product).toHaveProperty("_id");

    const user = await createUser();
    const foundedUser = await UserService.getCart(user._id);
    expect(foundedUser).toHaveProperty("_id");

    await UserService.addProductToCart(product.id, foundedUser.id);
    const updateUser2 = await UserService.addProductToCart(
      product.id,
      foundedUser.id
    );
    expect(updateUser2.cart.length).toEqual(1);
    expect(updateUser2.cart[0].quantity).toEqual(2);
  });

  it("should decrease the quantity of product in cart", async () => {
    const product = await createProduct();
    expect(product).toHaveProperty("_id");

    const user = await createUser();
    const foundedUser = await UserService.getCart(user._id);
    expect(foundedUser).toHaveProperty("_id");

    await UserService.addProductToCart(product.id, foundedUser.id);

    const updateUser3 = await UserService.decreaseQuantityOfProduct(
      product.id,
      foundedUser.id
    );

    expect(updateUser3.cart.length).toEqual(1);
    expect(updateUser3.cart[0].quantity).toEqual(1);
  });

  it("should remove product in cart", async () => {
    const product = await createProduct();
    expect(product).toHaveProperty("_id");

    const user = await createUser();
    const foundedUser = await UserService.getCart(user._id);
    expect(foundedUser).toHaveProperty("_id");

    await UserService.addProductToCart(product.id, foundedUser.id);

    const updateUser2 = await UserService.removeProductInCart(
      product.id,
      foundedUser.id
    );
    expect(updateUser2.cart.length).toEqual(0);
  });
});
