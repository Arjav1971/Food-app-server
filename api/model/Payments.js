const { Transaction } = require("mongodb");
const mongoose = require("mongoose");

const { Schema } = mongoose;

// create schema for menu items
const paymentSchema = new Schema({
  transactionId: String,
  email: String,
  price: Number,
  quantity: Number,
  status: String,
  itemName: Array,
  cartItems: Array,
  menuItems: Array,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
