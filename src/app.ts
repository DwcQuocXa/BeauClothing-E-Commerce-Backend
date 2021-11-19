import express from "express";
import cors from "cors";
import passport from "passport";

import productRouter from "./routers/product";
import userRouter from "./routers/user";
import errorHandler from "errorhandler";

const app = express();

app.set("port", process.env.PORT);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send("Deploy successfully");
});

app.use(errorHandler());

export default app;
