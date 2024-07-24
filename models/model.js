const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: {
    required: true,
    type: Number,
  },
  item: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("Order", orderSchema); //creates a Model instance. Remember, a Model instance is what you use to actually interact with the database
