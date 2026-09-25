import express from "express";

import { userController } from "../controllers/user.controller.js";

import { uploadDiskStorage } from "../common/multer/disk-storage.multer.js";

import { protect } from "../common/middlewares/protect.middleware.js";

import { uploadMemoryStorage } from "../common/multer/memory-storage.multer.js";

const userRouter = express.Router();

// upload avatar local
userRouter.post(
  "/avatar-local",
  protect,
  uploadDiskStorage.single("avatar"),
  userController.avatarLocal,
);

// upload avatar cloud
userRouter.post(
  "/avatar-cloud",
  protect,
  uploadMemoryStorage.single("avatar"),
  userController.avatarCloud,
);

// cập nhật thông tin cá nhân
userRouter.put("/me", protect, userController.updateMe);

// lấy danh sách user
userRouter.get("/", userController.findAll);

// lấy user theo id
userRouter.get("/:userID", userController.findOne);

export default userRouter;
