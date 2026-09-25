import express from "express";
import { saveImageController } from "../controllers/saveImage.controller.js";
import { protect } from "../common/middlewares/protect.middleware.js";

const saveImageRouter = express.Router();

saveImageRouter.get("/check/:imageId", protect, saveImageController.checkSaved);

saveImageRouter.post("/:imageId", protect, saveImageController.save);
saveImageRouter.get("/", protect, saveImageController.findSavedByUser);

export default saveImageRouter;
