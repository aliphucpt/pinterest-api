import { commentService } from "../services/comment.service.js";
import { responseSuccess } from "../common/helpers/response.helper.js";

export const commentController = {
  async findByImageId(req, res, next) {
    const result = await commentService.findByImageId(req);

    const response = responseSuccess(result, "Get comments successfully");

    res.status(response.statusCode).json(response);
  },
  async create(req, res, next) {
    const result = await commentService.create(req);

    const response = responseSuccess(result, "Create comment successfully");

    res.status(response.statusCode).json(response);
  },
};
