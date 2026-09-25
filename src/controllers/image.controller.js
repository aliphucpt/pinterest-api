import { imageService } from "../services/image.service.js";
import { responseSuccess } from "../common/helpers/response.helper.js";

export const imageController = {
  async findAll(req, res, next) {
    const result = await imageService.findAll(req);

    const response = responseSuccess(result, "Get images successfully");

    res.status(response.statusCode).json(response);
  },

  async findOne(req, res, next) {
    const result = await imageService.findOne(req);

    const response = responseSuccess(result, "Get image detail successfully");

    res.status(response.statusCode).json(response);
  },

  async create(req, res, next) {
    const result = await imageService.create(req);

    const response = responseSuccess(result, "Create image successfully");

    res.status(response.statusCode).json(response);
  },
  async findCreatedByUser(req, res, next) {
    const result = await imageService.findCreatedByUser(req);

    const response = responseSuccess(result, "Get created images successfully");

    res.status(response.statusCode).json(response);
  },
  async remove(req, res, next) {
    const result = await imageService.remove(req);

    const response = responseSuccess(result, "Delete image successfully");

    res.status(response.statusCode).json(response);
  },
  async search(req, res, next) {
    const result = await imageService.search(req);

    const response = responseSuccess(result, "Search images successfully");

    res.status(response.statusCode).json(response);
  },
};
