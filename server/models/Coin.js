import mongoose from "mongoose";

const Schema = mongoose.Schema;

let coinSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  netCoins: {
    type: Number,
    required: true,
  },
  grossCoins: {
    type: Number,
    required: true,
  },
});

const coinModel = new mongoose.model("Coin", coinSchema, "onlyCoins");

export default coinModel;
