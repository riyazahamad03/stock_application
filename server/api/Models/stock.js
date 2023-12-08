const mongoose = require("mongoose");

const StockSchema = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  name: String,
  lower: { type: Number, required: true },
  upper: { type: Number, required: true },
  isTransacted: String,
});

module.exports = mongoose.model("Stock", StockSchema);
