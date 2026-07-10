// Import packages
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Import DB connection
const connectDB = require("./database/db");

// Load .env variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Pizza Delivery Backend is Running...");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);