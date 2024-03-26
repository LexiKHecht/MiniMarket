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
    amount: String,
    currencyCode: String,
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0,
  },
  tags: [
    {
      type: String,
      required: true,
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
