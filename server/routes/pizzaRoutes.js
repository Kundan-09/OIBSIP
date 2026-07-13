const express = require("express");
const router = express.Router();

const { addPizza } = require("../controllers/pizzaController");


console.log("Pizza Route Loaded");
console.log(addPizza);

// Add Pizza API
router.post("/", addPizza);

module.exports = router;