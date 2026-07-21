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



// Get All Pizzas
const getAllPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find();

    res.status(200).json({
      success: true,
      count: pizzas.length,
      pizzas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Pizza By ID
const getPizzaById = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);

    if (!pizza) {
      return res.status(404).json({
        success: false,
        message: "Pizza not found",
      });
    }

    res.status(200).json({
      success: true,
      pizza,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Pizza
const updatePizza = async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!pizza) {
      return res.status(404).json({
        success: false,
        message: "Pizza not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Pizza Updated Successfully",
      pizza,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// Delete Pizza
const deletePizza = async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndDelete(req.params.id);

    if (!pizza) {
      return res.status(404).json({
        success: false,
        message: "Pizza not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Pizza Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addPizza,
  getAllPizzas,
  getPizzaById,
  updatePizza,
  deletePizza,
};