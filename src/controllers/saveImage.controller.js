import { saveImageService } from "../services/saveImage.service.js";
import { responseSuccess } from "../common/helpers/response.helper.js";

export const saveImageController = {
  async checkSaved(req, res, next) {
    const result = await saveImageService.checkSaved(req);

    const response = responseSuccess(result, "Check saved image successfully");

    res.status(response.statusCode).json(response);
  },
  async save(req, res, next) {
    const result = await saveImageService.save(req);

    const response = responseSuccess(result, "Save image successfully");

    res.status(response.statusCode).json(response);
  },
  async findSavedByUser(req, res, next) {
    const result = await saveImageService.findSavedByUser(req);

    const response = responseSuccess(result, "Get saved images successfully");

    res.status(response.statusCode).json(response);
  },
};
