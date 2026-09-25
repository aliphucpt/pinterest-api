import { statusCodes } from "./statusCode.helper.js";

export const responseSuccess = (
  result,
  message = "Lấy danh sách thành công",
  statusCode = statusCodes.OK,
) => {
  return {
    status: "success",
    statusCode: statusCode,
    message: message,
    data: result,
  };
};

export const responseError = (
  message = "Internal Server Error",
  statusCode = statusCodes.INTERNAL_SERVER_ERROR,
  stack = null,
) => {
  return {
    status: "error",
    statusCode: statusCode,
    message: message,
    stack: stack,
  };
};
