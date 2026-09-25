import express from "express";
import { commentController } from "../controllers/comment.controller.js";
import { protect } from "../common/middlewares/protect.middleware.js";

const commentRouter = express.Router();

commentRouter.get("/image/:imageId", commentController.findByImageId);

commentRouter.post("/image/:imageId", protect, commentController.create);

export default commentRouter;
