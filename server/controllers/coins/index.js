import express from "express";
import User from "../../models/User.js";
import Coin from "../../models/Coin.js";

const router = express.Router();
import {
  coinValidations,
  errorMiddleware,
} from "../../middlewares/validations/index.js";
import verifyToken from "../../middlewares/auth/index.js";

/*
    API EndPoint : /api/todos
    Method : GET
    Access Type : Private
    Validations : 
    Description : Get all todos of a user
*/
router.get("/", async (req, res) => {
  try {
    const coinData = await Coin.find({}).populate("user", "-email -password"); //using find by id is optimal
    res.status(200).json(coinData[coinData.length - 1]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

/*
      API EndPoint : /api/todos/todo/add
      Method : POST
      Payload : Request.Body - taskname,deadline,isDone, request.headers - access token
      Access Type : Public
      Validations : 

      Description :Add task
*/

router.post(
  "/",
  coinValidations(),
  errorMiddleware,
  verifyToken,
  async (req, res) => {
    try {
      req.body.user = req.user._id;
      const newRecord = new Coin(req.body);
      await newRecord.save();

      res.status(200).json(newRecord);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  }
);

export default router;
