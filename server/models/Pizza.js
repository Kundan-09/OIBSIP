const mongoose = require("mongoose");

// Pizza Schema
const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  isAvailable: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true // Automatically adds createdAt & updatedAt
});

module.exports = mongoose.model("Pizza", pizzaSchema);