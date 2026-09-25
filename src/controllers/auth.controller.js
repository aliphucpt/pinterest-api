import { authService } from "../services/auth.service.js";
import { responseSuccess } from "../common/helpers/response.helper.js";

export const authController = {
  async register(req, res, next) {
    const result = await authService.register(req);

    const response = responseSuccess(result, `Register successfully`);

    res.status(response.statusCode).json(response);
  },

  async login(req, res, next) {
    const result = await authService.login(req);

    const response = responseSuccess(result, `Login successfully`);

    res.cookie("accessToken", result.accessToken);
    res.cookie("refreshToken", result.refreshToken);

    res.status(response.statusCode).json(response);
  },

  async getInfo(req, res, next) {
    const result = await authService.getInfo(req);

    const response = responseSuccess(result, "Get info successfully");

    res.status(response.statusCode).json(response);
  },

  async refreshToken(req, res, next) {
    const result = await authService.refreshToken(req);

    const response = responseSuccess(result, "Refresh token successfully");

    res.status(response.statusCode).json(response);
  },

  async googleCallback(req, res, next) {
    console.log(req.user);

    res.cookie("accessToken", req.user.accessToken);
    res.cookie("refreshToken", req.user.refreshToken);

    res.redirect("http://localhost:3000/login-callback");
  },
};
