const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LiveSchema = new Schema({
  transaction: {type: String, required: true},
  playAddress: { type: String, required: true },
  wager: { type: Number,required: true },
  numbets: { type: Number, required: true},
  multiplier: {type: Number, required: true},
  profit: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = Live = mongoose.model("Live",LiveSchema);