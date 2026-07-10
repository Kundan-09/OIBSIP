const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/authController");
console.log(registerUser);

// Register Route
router.post("/register", registerUser);

module.exports = router;