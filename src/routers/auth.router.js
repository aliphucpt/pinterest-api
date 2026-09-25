// @ts-check

import express from "express";
import { authController } from "../controllers/auth.controller.js";
import { loginLimit } from "../common/middlewares/rateLimit.middleware.js";
import { protect } from "../common/middlewares/protect.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", authController.register);

authRouter.post("/login", loginLimit, authController.login);

authRouter.get("/get-info", protect, authController.getInfo);

authRouter.post("/refresh-token", authController.refreshToken);

export default authRouter;
