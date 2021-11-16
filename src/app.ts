import express from "express";
import cors from "cors";

import productRouter from "./routers/product";
import errorHandler from "errorhandler";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/products", productRouter);

app.get("/", (req, res) => {
  res.send("Deploy successfully");
});

app.use(errorHandler());

export default app;
