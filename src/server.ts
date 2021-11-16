import errorHandler from "errorhandler";
import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "./app";
//import { MONGODB_URI } from "./util/secrets";
dotenv.config({ path: ".env" });

const PORT = process.env.PORT;
const mongodbUrl = process.env.MONGODB_URI as string;

export const mongo = async () => {
  await mongoose
    .connect(mongodbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      // Start Express server
      app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    })
    .catch((error: Error) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " +
          error
      );
      process.exit(1);
    });
};

mongo();
/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());
