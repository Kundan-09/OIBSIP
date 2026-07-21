const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    // Each cart belongs to one user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Products added to the cart
    items: [
      {
        pizza: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Pizza",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          default: 1,
          min: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);