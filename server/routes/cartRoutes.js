const express = require("express");
const router = express.Router();

const {
  addToCart,
  getMyCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

// Only logged-in users can add items to cart
router.post("/add", protect, addToCart);
router.get("/", protect, getMyCart);
router.put("/update", protect, updateCartQuantity);
router.delete("/remove/:pizzaId", protect, removeFromCart);
router.delete("/clear", protect, clearCart);

module.exports = router;