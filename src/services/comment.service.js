import { prisma } from "../common/prisma/connect.prisma.js";
import { BadRequestException } from "../common/helpers/exception.helper.js";

export const commentService = {
  async findByImageId(req) {
    const { imageId } = req.params;

    const comments = await prisma.comments.findMany({
      where: {
        imageId: Number(imageId),
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
        commentAt: "desc",
      },
    });

    return comments;
  },

  async create(req) {
    const { imageId } = req.params;
    const { content } = req.body;

    const image = await prisma.images.findUnique({
      where: {
        id: Number(imageId),
      },
    });

    if (!image) {
      throw new BadRequestException("Hình ảnh không tồn tại");
    }

    const newComment = await prisma.comments.create({
      data: {
        content: content,
        imageId: Number(imageId),
        userId: req.user.id,
      },
    });

    return newComment;
  },
};
