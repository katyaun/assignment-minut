import jwt from "jsonwebtoken";
import { config } from "../../config.js";
import AppError from "../../../../../assignment-minut/npm-packages/appError.js";

class TokenService {
  static key = config.jwtKey;
  static getToken(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new AppError({ statusCode: "4034" });
    }
    return authHeader;
  }

  static validateToken(req, res, next) {
    try {
      const token = TokenService.getToken(req);
      const decodedToken = jwt.verify(token, TokenService.key);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (decodedToken.exp && decodedToken.exp < currentTimestamp) {
        throw new AppError({ statusCode: "" });
      }
      req.userId = decodedToken.id;
      next();
    } catch (e) {
      throw new AppError({ statusCode: "4034" });
    }
  }
}

export default TokenService;
