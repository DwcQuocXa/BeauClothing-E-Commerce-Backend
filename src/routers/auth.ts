import express, { Response, Request } from "express";
import passport from "passport";

import { authenticate, signIn, signUp } from "../controllers/auth";

const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);

router.post(
  "/google-authenticate",
  passport.authenticate("google-id-token", { session: false }),
  authenticate
);

export default router;
