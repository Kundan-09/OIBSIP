const express = require("express");
const router = express.Router();

// Import controllers
const {
  addPizza,
  getAllPizzas,
  getPizzaById,
  updatePizza,
  deletePizza,
} = require("../controllers/pizzaController");

// Import authentication middleware
const { protect, authorize } = require("../middleware/authMiddleware");

// Public Routes - Anyone can view pizzas
router.get("/", getAllPizzas);
router.get("/:id", getPizzaById);

// Admin Routes - Only logged-in admins can manage pizzas
router.post("/", protect, authorize("admin"), addPizza);
router.put("/:id", protect, authorize("admin"), updatePizza);
router.delete("/:id", protect, authorize("admin"), deletePizza);

module.exports = router;