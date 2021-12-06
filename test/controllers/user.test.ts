// import request from "supertest";

// import User, { UserDocument } from "../../src/models/User";
// import Product from "../../src/models/Product";
// import UserService from "../../src/services/user";
// import ProductService from "../../src/services/product";
// import connect, { MongodHelper } from "../db-helper";
// import app from "../../src/app";

// const nonExistingProductId = "5e57b77b5744fa0b461c7906";

// async function createProduct() {
//   let product = {
//     name: "RELAXED FIT MOTIF-DETAIL HOODIE",
//     description:
//       "Smiley® x H&M. Hoodie in sweatshirt fabric with a motif front and back and a soft brushed inside. Relaxed fit with a lined, wrapover, drawstring hood, kangaroo pocket, dropped shoulders, long sleeves and ribbing at the cuffs and hem.",
//     categories: "T-Shirts",
//     sizes: ["XS", "S", "M", "L", "XL"],
//     price: 24.99,
//     img: [
//       "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fc7%2F79%2Fc779f00ea678411e215159fe67ee9790b4effa36.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]",
//     ],
//   };
//   return await request(app).post("/api/v1/products").send(product);
// }

// async function createUser(override?: Partial<UserDocument>) {
//   let user = new User({
//     firstName: "Duc",
//     lastName: "Ngo",
//     email: "random@gmail.com",
//     password: "randompassword",
//     cart: [],
//   });

//   //   if (override) {
//   //     user = { ...user, ...override };
//   //   }

//   return await request(app).post("/api/v1/users").send(user);
// }

// describe("user service", () => {
//   let mongodHelper: MongodHelper;
//   beforeEach(async () => {
//     mongodHelper = await connect();
//   });

//   afterEach(async () => {
//     await mongodHelper.clearDatabase();
//   });

//   afterAll(async () => {
//     await mongodHelper.closeDatabase();
//   });

//   it("should get a list of all users", async () => {
//     // const res1 = await createUser({
//     //   firstName: "Nguyen",
//     //   lastName: "Pham",
//     //   email: "random1@gmail.com",
//     // });
//     // const res2 = await createUser({
//     //   firstName: "Dat",
//     //   lastName: "Nguyen",
//     //   email: "random2@gmail.com",
//     // });
//     const res1 = await createUser();
//     const res3 = await request(app).get("/api/v1/users");

//     expect(res3.body.length).toEqual(1);
//     //expect(res3.body[0]._id).toEqual(res2.body._id);
//     //expect(res3.body[1]._id).toEqual(res1.body._id);
//   });

//   it("should manage products in the cart", async () => {
//     let res = await createProduct();
//     expect(res.status).toBe(200);
//     const productId = res.body._id;

//     res = await createUser();
//     expect(res.status).toBe(200);
//     const userId = res.body._id;

//     const body = {
//       productId: productId,
//       userId: userId,
//       isIncrease: true,
//     };

//     res = await request(app).put(`/api/v1/users/cart`).send(body);
//     expect(res.status).toEqual(200);
//     expect(res.body.cart.length).toEqual(1);
//     expect(res.body.cart[0].product._id).toEqual(productId);
//   });
// });
