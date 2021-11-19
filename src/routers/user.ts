import express, { Response, Request } from "express";
import passport from "passport";

import { createUser, findAll, authenticate } from "../controllers/user";

const router = express.Router();

router.post("/", createUser);
router.get("/", findAll);
router.post(
  "/google-authenticate",
  passport.authenticate("google-id-token"),
  authenticate
);

export default router;
