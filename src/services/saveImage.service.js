import { prisma } from "../common/prisma/connect.prisma.js";
import { BadRequestException } from "../common/helpers/exception.helper.js";

export const saveImageService = {
  async checkSaved(req) {
    const { imageId } = req.params;

    const saved = await prisma.savedImages.findUnique({
      where: {
        userId_imageId: {
          userId: req.user.id,
          imageId: Number(imageId),
        },
      },
    });

    return {
      isSaved: !!saved,
    };
  },

  async save(req) {
    const { imageId } = req.params;

    const image = await prisma.images.findUnique({
      where: {
        id: Number(imageId),
      },
    });

    if (!image) {
      throw new BadRequestException("Hình ảnh không tồn tại");
    }

    const savedExist = await prisma.savedImages.findUnique({
      where: {
        userId_imageId: {
          userId: req.user.id,
          imageId: Number(imageId),
        },
      },
    });

    if (savedExist) {
      throw new BadRequestException("Hình ảnh đã được lưu");
    }

    const savedImage = await prisma.savedImages.create({
      data: {
        userId: req.user.id,
        imageId: Number(imageId),
      },
    });

    return savedImage;
  },
  async findSavedByUser(req) {
    const savedImages = await prisma.savedImages.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        Images: {
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
        },
      },
      orderBy: {
        savedAt: "desc",
      },
    });

    return savedImages;
  },
};
