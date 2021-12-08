import express, { Response, Request } from "express";
import passport from "passport";

import { authenticate, findByEmail, signIn, signUp } from "../controllers/auth";

const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);

router.post("/google-authenticate", authenticate);
router.get("/google-authenticate/:email", findByEmail);

export default router;
