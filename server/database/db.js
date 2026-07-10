// Import mongoose
const mongoose = require("mongoose");

// Function to connect MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.log("❌ Database Connection Failed");
    console.log(error.message);

    process.exit(1); // Stop server if DB connection fails
  }
};

// Export function
module.exports = connectDB;