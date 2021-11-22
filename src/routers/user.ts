import express, { Response, Request } from "express";
import passport from "passport";

import { findAll, authenticate, signIn, signUp } from "../controllers/user";

const router = express.Router();

router.get("/", findAll);
router.post("/signin", signIn);
router.post("/signup", signUp);
router.post(
  "/google-authenticate",
  passport.authenticate("google-id-token", { session: false }),
  authenticate
);

export default router;
