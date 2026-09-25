import express from "express";
import { imageController } from "../controllers/image.controller.js";
import { protect } from "../common/middlewares/protect.middleware.js";
import { uploadMemoryStorage } from "../common/multer/memory-storage.multer.js";

const imageRouter = express.Router();

imageRouter.get("/", imageController.findAll);

imageRouter.get("/my-images", protect, imageController.findCreatedByUser);

imageRouter.get("/search", imageController.search);

imageRouter.get("/:id", imageController.findOne);

imageRouter.post(
  "/",
  protect,
  uploadMemoryStorage.single("image"),
  imageController.create,
);

imageRouter.delete("/:id", protect, imageController.remove);

export default imageRouter;
