const Pizza = require("../models/Pizza");

// Add Pizza
const addPizza = async (req, res) => {
  try {
    const pizza = await Pizza.create(req.body);

    res.status(201).json({
      success: true,
      message: "Pizza Added Successfully",
      pizza,
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { addPizza };