import AES from "crypto-js/aes.js";
import jwt, { decode } from "jsonwebtoken";
import enc from "crypto-js/enc-utf8.js";
import "dotenv/config";

function verifyToken(req, res, next) {
  try {
    let token = req.headers["x-auth-key"];
    // decryptt
    if (!token) {
      return res.status(401).json({ msg: "Token is required/Invalid token" });
    }
    let bufferToken = AES.decrypt(token, process.env.AESKEY);
    let decryptedToken = enc.stringify(bufferToken);
    let decoded = jwt.verify(decryptedToken, process.env.JWTKEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "error" });
  }
}

export default verifyToken;
