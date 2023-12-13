const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    slug: {
        type: String,
        lowercase: true,
    }
});

var Product = mongoose.model("Product", productSchema);

module.exports = Product;