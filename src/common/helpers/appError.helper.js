import { responseError } from "./response.helper.js";
import jwt from "jsonwebtoken";
import { statusCodes } from "./statusCode.helper.js";

export const appError = (err, req, res, next) => {
  console.log("mid err đặc biệt", err);
  if (err instanceof jwt.JsonWebTokenError) {
    err.code = statusCodes.UNAUTHORIZED;
  }

  if (err instanceof jwt.TokenExpiredError) {
    err.code = statusCodes.FORBIDDEN;
  }

  const response = responseError(err?.message, err?.code, err?.stack);

  res.status(response.statusCode).json(response);
};
