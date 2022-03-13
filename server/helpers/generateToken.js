import jwt from "jsonwebtoken";
import "dotenv/config";
import AES from "crypto-js/aes.js";
function generateToken(id) {
  let token = jwt.sign(
    {
      _id: id,
    },
    process.env.JWTKEY,
    { expiresIn: "1h" }
  );
  return AES.encrypt(token, process.env.AESKEY).toString();
}
export default generateToken;
