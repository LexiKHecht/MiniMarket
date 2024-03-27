const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  productId: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
  },
  imageURL: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0,
  },
  tags: [
    {
      type: String,
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
