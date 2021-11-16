import Product from "../models/Product";
import { mongo } from "../server";

let productsData = [
  {
    name: "Wool-blend baseball jacket",
    description:
      "Edition by John Boyega. An uncompromising collection developed together with actor and innovator, John Boyega. This lightly padded baseball jacket in woven fabric made from a soft wool blend has a ribbed collar and press-studs down the front. It has a diagonal welt pocket with a press-stud at each side, an inner pocket and ribbing at the cuffs and hem. Quilted satin lining.",
    categories: "Jackets",
    sizes: ["XS", "S", "M", "L", "XL"],
    price: 139.99,
    img: [
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F9d%2F7c%2F9d7cb0fdd7fc417cda5223c6e804db6f5840af33.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]",
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F02%2Fc1%2F02c188429ec47d689ba6b8842c4aafec036d4844.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    ],
  },
  {
    name: "Double-breasted wool-mix coat",
    description:
      "Edition by John Boyega. An uncompromising collection made from more sustainable materials developed together with actor and innovator, John Boyega. This calf-length, double-breasted coat is made in a soft weave containing some recycled wool. In a straight cut, it has wide notch lapels, corozo nut buttons, flap front pockets, an inner pocket, and a single back vent. Lined.",
    categories: "Jackets",
    sizes: ["XS", "S", "M", "L", "XL"],
    price: 149.99,
    img: [
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F1e%2Fdb%2F1edbc3769844f46e0b59079f88640d421ebfeb08.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]",
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fba%2F2d%2Fba2d20f86f00714e94743686fd11bf1bf4066ca4.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_jacketscoats_coats%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    ],
  },
  {
    name: "Wool-blend coat",
    description:
      "Edition by John Boyega. An uncompromising collection made from more sustainable materials developed together with actor and innovator, John Boyega. This calf-length, double-breasted coat is made in a soft weave containing some recycled wool. In a straight cut, it has wide notch lapels, corozo nut buttons, flap front pockets, an inner pocket, and a single back vent. Lined.",

    categories: "Jackets",
    sizes: ["XS", "S", "M", "L", "XL"],
    price: 69.99,
    img: [
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fcd%2Ff6%2Fcdf675f0692a0295d1ff0b744da766e30105df32.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]",
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fd9%2F0e%2Fd90e1f4866251660553bfef9c5680f43440f9158.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    ],
  },
  {
    name: "Quilted grape leather puffer jacket",
    description:
      "Edition by John Boyega. An uncompromising collection made from more sustainable materials developed together with actor and innovator, John Boyega. This quilted puffer jacket is in Vegea™ imitation leather, a material made from bio-waste produced during the winemaking process. The jacket has a stand-up collar, a zip and wind flap with press-studs down the front, fleece-lined front pockets with a press-stud and an inner pocket. Elasticated ribbing at the cuffs and a concealed elastic drawstring at the hem for an adjustable fit. The sleeves can be unzipped and detached to allow the jacket to be worn as a gilet. Lined.",

    categories: "Jackets",
    sizes: ["XS", "S", "M", "L", "XL"],
    price: 229.99,
    img: [
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F33%2Ff9%2F33f9f296be008242bad9f14fa93299403f977bb8.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_jacketscoats_jackets%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]",
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F31%2Fa2%2F31a2dc4991605605410e88df9eaa5a81f04fdecd.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    ],
  },
  {
    name: "Regular Fit embroidery-detail rugby shirt",
    description:
      "Edition by John Boyega. An uncompromising collection made from more sustainable materials developed together with actor and innovator, John Boyega. This quilted puffer jacket is in Vegea™ imitation leather, a material made from bio-waste produced during the winemaking process. The jacket has a stand-up collar, a zip and wind flap with press-studs down the front, fleece-lined front pockets with a press-stud and an inner pocket. Elasticated ribbing at the cuffs and a concealed elastic drawstring at the hem for an adjustable fit. The sleeves can be unzipped and detached to allow the jacket to be worn as a gilet. Lined.",

    categories: "T-Shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    price: 19.99,
    img: [
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F85%2F84%2F8584d4a91939bc882f2132b4427e580d32fbff54.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]",
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fac%2Fc6%2Facc6b299d6ab483ea2605585b909ef86ea22cc34.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    ],
  },
  {
    name: "Flower Cotton T-shirt",
    description: "T-shirt in soft cotton jersey.",
    categories: "T-Shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    price: 19.99,
    img: [
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F07%2Fec%2F07ececdebb1804c10749bcc30569f9152d5b394e.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]",
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F82%2F32%2F8232534428522832315b5aa64633d7046e28c107.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    ],
  },
  {
    name: "Relaxed Fit Jersey top",
    description:
      "Top in soft cotton jersey with a round, rib-trimmed neckline. Relaxed fit with dropped shoulders, long sleeves and wide ribbing at the cuffs.",
    categories: "T-Shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    price: 27.99,
    img: [
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F72%2F47%2F7247c7e2ed1049c270904da68d68f23e9fa684cc.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]",
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F83%2Fc3%2F83c3e0096a7369ea11b29e8b2aac0651a9784dc6.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    ],
  },
  {
    name: "Block-coloured T-shirt",
    description:
      "Top in soft cotton jersey with a round, rib-trimmed neckline. Relaxed fit with dropped shoulders, long sleeves and wide ribbing at the cuffs.",
    categories: "T-Shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    price: 15.99,
    img: [
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fdb%2Fcf%2Fdbcfdfe143baeda32b73998d1076edc0951ac3b9.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_tshirtstanks_printed%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]",
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F0e%2F4d%2F0e4d19eb891e5fd74f874fbfcb16b108c65efa23.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    ],
  },
  {
    name: "Cotton denim Loose Jeans",
    description:
      "Edition by John Boyega. An uncompromising collection made from more sustainable materials developed together with actor and innovator, John Boyega. These 5-pocket jeans in sturdy denim made from recycled cotton have a regular waist, zip fly and button and loose-fitting legs.",
    categories: "Pants",
    sizes: ["XS", "S", "M", "L", "XL"],
    price: 39.99,
    img: [
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F36%2F79%2F36796b7a4998e613a7da9f002a2fd699994cb3dc.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_trousers%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]",
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F73%2F09%2F7309a16586ff6c67ae18cb8ff27464a3dea50457.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_jeans_loose%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    ],
  },
  {
    name: "Regular Jeans",
    description:
      "5-pocket jeans in stretch denim with a regular waist, zip fly and button and straight legs with good room for movement over the thighs and knees.",
    categories: "Pants",
    sizes: ["XS", "S", "M", "L", "XL"],
    price: 24.99,
    img: [
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Ffc%2Fba%2Ffcba25c2a546ed633a5eca1b14f46219bb196513.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_jeans%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Ffe%2Fab%2Ffeab9ceb516cc017a59b739eb686eee831d020f1.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_jeans_regular%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    ],
  },
  {
    name: "Relaxed Jeans",
    description:
      "Edition by John Boyega. An uncompromising collection made from more sustainable materials developed together with actor and innovator, John Boyega. These 5-pocket jeans in sturdy denim made from recycled cotton have a regular waist, zip fly and button and loose-fitting legs.",
    categories: "Pants",
    sizes: ["XS", "S", "M", "L", "XL"],
    price: 24.99,
    img: [
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F26%2Fe8%2F26e8d1798edc59f3cdfb84ca9068094ba6ca070d.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]",
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F81%2F2d%2F812db6d977430047149d5f4f442f53cfdef38e5b.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    ],
  },
  {
    name: "Skinny Jeans",
    description:
      "5-pocket jeans in stretch cotton denim with a regular waist, zip fly and button, and skinny legs.",
    categories: "Pants",
    sizes: ["XS", "S", "M", "L", "XL"],
    price: 17.99,
    img: [
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F3b%2F96%2F3b9675cd1f97ce69d2787406457e984944b77c7c.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]",
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fb3%2Ff6%2Fb3f6559fabc023d978477b2a437ff78e1e7691d8.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    ],
  },
  {
    name: "Loose Jeans",
    description:
      "5-pocket jeans in sturdy cotton denim. Loose fit with a regular waist, zip fly and button and wide legs.",
    categories: "Pants",
    sizes: ["XS", "S", "M", "L", "XL"],
    price: 24.99,
    img: [
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F7f%2F09%2F7f09ec485a69eb97c01cf85cff1a3ac7687a2a0f.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]",
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fa1%2F13%2Fa1136aed48e7b6a9b306fc4d97c4f79818058ca3.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    ],
  },
  {
    name: "Leather brogues",
    description:
      "Toga Archives x H&M. A collection of classic, iconic pieces from Tokyo-based TOGA. Wardrobe classics characterised by innovative details and functions, defined by a gender-neutral, individual approach to fashion. A pair of brogues in leather with perforated details and an extended shaft in scuba fabric. Open lacing at the front and a chunky zip with a metal ring pull at the back. Leather linings and insoles and rubber soles.",
    categories: "Shoes",
    sizes: ["XS", "S", "M", "L", "XL"],
    price: 199.99,
    img: [
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Ffe%2Ffd%2Ffefd4e6faac9a91db4065a7a6bbdc21f6c0c9b50.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]",
      "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F1d%2F90%2F1d906b0434731018f989dac5fbf32ec685d03fca.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_shoes_dressed%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    ],
  },
  {
    name: "TEDDY MONKSTRAPS IN PATENT LEATHER",
    description:
      "DERBIES WITH AN ALMOND TOE AND A SINGLE MONK STRAP WITH METAL BUCKLE.",
    categories: "Shoes",
    sizes: ["XS", "S", "M", "L", "XL"],
    price: 394.99,
    img: [
      "https://saint-laurent.dam.kering.com/m/7a3626ef06c85277/Medium-6688941TV001000_A.jpg?v=6",
      "https://saint-laurent.dam.kering.com/m/a433aa64bd1452c/Medium-6688941TV001000_B.jpg?v=5",
    ],
  },
  {
    name: "Bryson Suede Chelsea Boot",
    description:
      "The Bryson combines the refined styling of a Chelsea boot with the durability of a rubber lug sole. This sophisticated shoe features an oiled suede upper accented with a woven logo pull tab at the heel.",
    categories: "Shoes",
    sizes: ["XS", "S", "M", "L", "XL"],
    price: 199.99,
    img: [
      "https://www.rlmedia.io/is/image/PoloGSI/s7-1339647_lifestyle?$rl_df_pdp_5_7_lif$",
      "https://www.rlmedia.io/is/image/PoloGSI/s7-1339647_alternate1?$rl_df_pdp_5_7$",
    ],
  },
  {
    name: "Logo Print Vintage Check Cotton Sneakers",
    description:
      "Cotton sneakers in Vintage check, printed with our refreshed logo in contrasting tones.",
    categories: "Shoes",
    sizes: ["XS", "S", "M", "L", "XL"],
    price: 249.99,
    img: [
      "https://assets.burberry.com/is/image/Burberryltd/15284bd2a24bd2430615f5f73067b3d6504e7ba9.jpg?$BBY_V2_SL_1x1$&wid=1251&hei=1251",
      "https://assets.burberry.com/is/image/Burberryltd/8c8f999797a19d9fcba56bf99bde1fea8d4dde12.jpg?$BBY_V2_ML_1x1$&wid=1251&hei=1251",
    ],
  },
];

export const importData = async () => {
  try {
    await Product.insertMany(productsData);

    console.log("Data Import Success");

    process.exit();
  } catch (error) {
    console.error("Error with data import", error);
    process.exit(1);
  }
};

importData();
