const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const { protect,authorize} = require("../middleware/authMiddleware");

// Place a new order - logged-in users only
router.post("/", protect, placeOrder);

// Get logged-in user's order history
router.get("/my-orders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
// Admin routes
router.get("/admin/all", protect, authorize("admin"), getAllOrders);
router.put("/admin/:id/status", protect, authorize("admin"), updateOrderStatus);
module.exports = router;