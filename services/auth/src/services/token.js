import jwt from "jsonwebtoken";
import { config } from "../../config.js";

class TokenService {
  static generateToken(data) {
    return jwt.sign(data, config.jwtKey, { expiresIn: "1h" });
  }
}

export default TokenService;
