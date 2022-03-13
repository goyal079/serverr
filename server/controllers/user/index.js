import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();

// import validations
import {
  userRegistrationValidations,
  userLoginValidations,
  errorMiddleware,
} from "../../middlewares/validations/index.js";

// import model
import User from "../../models/User.js";
// import helpers
import generateToken from "../../helpers/generateToken.js";
// import verifyToken from "../../middlewares/auth/index.js";

/*
    API EndPoint : /api/user/register
    Method : POST
    Access Type : Public
    Validations : 
    Description : Get user details
*/

router.post(
  "/register",
  userRegistrationValidations(),
  errorMiddleware,
  async (req, res) => {
    try {
      const userData = await User.findOne({ email: req.body.email });
      const usernameData = await User.findOne({ username: req.body.username });

      if (userData) {
        return res.status(401).json({ msg: "User already exists" });
      }
      if (usernameData) {
        return res.status(401).json({ msg: "Username unavailable" });
      }
      const { confirmpassword, password } = req.body;
      if (password != confirmpassword) {
        return res.status(401).json({ msg: "Passwords do not match" });
      }
      const finalData = new User(req.body, "-confirmpassword");

      const salt = await bcrypt.genSalt(10);
      finalData.password = await bcrypt.hash(req.body.password, salt);
      await finalData.save();
      res.status(200).json({
        _id: finalData._id,
        firstname: finalData.firstname,
        lastname: finalData.lastname,
        username: finalData.username,
        email: finalData.email,
        token: generateToken(finalData._id),
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

/*
      API EndPoint : /api/users/login
      Method : POST
      Payload : Request.Body - email,password
      Access Type : Public
      Validations : 
          a) Check Valid Email and verify if password is the same
      Description : User Login 
*/
router.post(
  "/login",
  userLoginValidations(),
  errorMiddleware,
  async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ msg: "Invalid login credentials" });
      }
      let correctPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!correctPassword) {
        return res.status(401).json({ msg: "Invalid login credentials" });
      }
      res.status(200).json({
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  }
);

export default router;
