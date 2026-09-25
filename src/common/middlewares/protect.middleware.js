import { tokenService } from "../../services/token.service.js";
import { prisma } from "../prisma/connect.prisma.js";
import { UnauthorizedException } from "../helpers/exception.helper.js";

export const protect = async (req, res, next) => {
  // bước 1: lấy token từ header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedException("Vui lòng đăng nhập để tiếp tục");
  }

  // bước 2: lấy accessToken
  // Authorization: Bearer abcxyz
  const accessToken = authHeader.split(" ")[1];

  // bước 3: kiểm tra accessToken
  const decode = tokenService.verifyAccessToken(accessToken);

  if (!decode) {
    throw new UnauthorizedException("Token không hợp lệ");
  }

  // bước 4: kiểm tra user có tồn tại không
  const userExist = await prisma.users.findUnique({
    where: {
      id: decode.userId,
    },
  });

  if (!userExist) {
    throw new UnauthorizedException("Người dùng không tồn tại");
  }

  // gắn thông tin user vào request
  req.user = userExist;

  next();
};
