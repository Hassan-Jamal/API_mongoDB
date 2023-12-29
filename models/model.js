const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  Name: String,
  scores: Number,
  slug: {
    type: String,
    lowercase: true,
  },
});
const productModel = mongoose.model("product", productSchema);
module.exports = productModel;