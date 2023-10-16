import jwt from "jsonwebtoken";
import { config } from "../../config.js";

class TokenService {
  static generateToken(data) {
    console.log('dsdds', jwt.sign(data, config.jwtKey, { expiresIn: "1h" }));
    return jwt.sign(data, config.jwtKey, { expiresIn: "1h" });
  }
}

export default TokenService;
