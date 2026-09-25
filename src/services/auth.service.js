import { prisma } from "../common/prisma/connect.prisma.js";
import {
  BadRequestException,
  UnauthorizedException,
} from "../common/helpers/exception.helper.js";
import bcrypt from "bcrypt";
import { tokenService } from "./token.service.js";

export const authService = {
  async register(req) {
    const { email, password, fullName, age } = req.body;

    // kiểm tra email đã được đăng ký chưa
    const userExit = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (userExit) {
      throw new BadRequestException("Tài khoản đã được đăng ký");
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const newUser = await prisma.users.create({
      data: {
        email: email,
        password: hashPassword,
        fullName: fullName,
        age: age ? Number(age) : null,
      },
    });

    return {
      id: newUser.id,
      email: newUser.email,
      fullName: newUser.fullName,
      age: newUser.age,
    };
  },

  async login(req) {
    const { email, password } = req.body;

    const userExit = await prisma.users.findUnique({
      where: {
        email: email,
      },
      omit: {
        password: false,
      },
    });

    if (!userExit) {
      throw new BadRequestException("Tài khoản không chính xác");
    }

    const isPasswordValid = bcrypt.compareSync(password, userExit.password);

    if (!isPasswordValid) {
      throw new BadRequestException("Tài khoản không chính xác");
    }

    const accessToken = tokenService.createAccessToken(userExit.id);

    const refreshToken = tokenService.createRefreshToken(userExit.id);

    return {
      accessToken,
      refreshToken,
    };
  },

  async getInfo(req) {
    return req.user;
  },

  async refreshToken(req) {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken || !refreshToken) {
      throw new BadRequestException("Vui lòng đăng nhập để tiếp tục");
    }

    const decodeAccessToken = tokenService.verifyAccessToken(accessToken, {
      ignoreExpiration: true,
    });

    const decodeRefreshToken = tokenService.verifyRefreshToken(refreshToken);

    if (decodeAccessToken.userId !== decodeRefreshToken.userId) {
      throw new UnauthorizedException("Token không hợp lệ");
    }

    const userExist = await prisma.users.findUnique({
      where: {
        id: decodeAccessToken.userId,
      },
    });

    if (!userExist) {
      throw new UnauthorizedException("Người dùng không tồn tại");
    }

    const newAccessToken = tokenService.createAccessToken(userExist.id);

    return {
      accessToken: newAccessToken,
      refreshToken: refreshToken,
    };
  },
};
