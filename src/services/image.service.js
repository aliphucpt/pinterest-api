import { prisma } from "../common/prisma/connect.prisma.js";
import { BadRequestException } from "../common/helpers/exception.helper.js";
import { v2 as cloudinary } from "cloudinary";

export const imageService = {
  async findAll(req) {
    const images = await prisma.images.findMany({
      include: {
        Users: {
          select: {
            id: true,
            email: true,
            fullName: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    return images;
  },

  async findOne(req) {
    const { id } = req.params;

    const image = await prisma.images.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        Users: {
          select: {
            id: true,
            email: true,
            fullName: true,
            avatar: true,
          },
        },
      },
    });

    if (!image) {
      throw new BadRequestException("Hình ảnh không tồn tại");
    }

    return image;
  },

  async create(req) {
    const { imageName, description } = req.body;

    if (!req.file) {
      throw new BadRequestException("Vui lòng chọn hình ảnh để upload");
    }

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "pinterest_api/images",
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }

            resolve(result);
          },
        )
        .end(req.file.buffer);
    });

    const newImage = await prisma.images.create({
      data: {
        imageName: imageName,
        imageUrl: uploadResult.secure_url,
        description: description,
        userId: req.user.id,
      },
    });

    return newImage;
  },
  async findCreatedByUser(req) {
    const images = await prisma.images.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        id: "desc",
      },
    });

    return images;
  },
  async remove(req) {
    const { id } = req.params;

    const image = await prisma.images.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!image) {
      throw new BadRequestException("Hình ảnh không tồn tại");
    }

    if (image.userId !== req.user.id) {
      throw new BadRequestException("Bạn không có quyền xóa hình ảnh này");
    }

    // Xóa dữ liệu phụ thuộc trước để không bị lỗi khóa ngoại (RESTRICT).
    // Transaction đảm bảo hoặc xóa toàn bộ, hoặc không xóa gì nếu có lỗi.
    await prisma.$transaction([
      prisma.comments.deleteMany({
        where: { imageId: Number(id) },
      }),
      prisma.savedImages.deleteMany({
        where: { imageId: Number(id) },
      }),
      prisma.images.delete({
        where: { id: Number(id) },
      }),
    ]);

    return true;
  },
  async search(req) {
    const { keyword } = req.query;

    const images = await prisma.images.findMany({
      where: {
        imageName: {
          contains: keyword || "",
        },
      },
      include: {
        Users: {
          select: {
            id: true,
            email: true,
            fullName: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    return images;
  },
};
