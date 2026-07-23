const Cart = require("../models/Cart");
const Pizza = require("../models/Pizza");

// Add Pizza to Cart
const addToCart = async (req, res) => {
  try {
    const { pizzaId, quantity = 1 } = req.body;

    // Check if pizza exists
    const pizza = await Pizza.findById(pizzaId);

    if (!pizza) {
      return res.status(404).json({
        success: false,
        message: "Pizza not found",
      });
    }

    // Find logged-in user's cart
    let cart = await Cart.findOne({ user: req.user._id });

    // Create cart if user doesn't have one
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [
          {
            pizza: pizzaId,
            quantity,
          },
        ],
      });
    } else {
      // Check if pizza is already in cart
      const existingItem = cart.items.find(
        (item) => item.pizza.toString() === pizzaId
      );

      if (existingItem) {
        // Increase quantity
        existingItem.quantity += quantity;
      } else {
        // Add new pizza
        cart.items.push({
          pizza: pizzaId,
          quantity,
        });
      }

      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: "Pizza Added to Cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// Get logged-in user's cart
const getMyCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.pizza");

    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        cart: {
          items: [],
        },
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Update Cart Item Quantity
const updateCartQuantity = async (req, res) => {
  try {
    const { pizzaId, quantity } = req.body;

    // Quantity must be at least 1
    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    // Find logged-in user's cart
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Find pizza inside cart
    const item = cart.items.find(
      (item) => item.pizza.toString() === pizzaId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Pizza not found in cart",
      });
    }

    // Update quantity
    item.quantity = quantity;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart Quantity Updated Successfully",
      cart,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Remove Pizza from Cart
const removeFromCart = async (req, res) => {
  try {
    const { pizzaId } = req.params;

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Remove matching pizza from items
    cart.items = cart.items.filter(
      (item) => item.pizza.toString() !== pizzaId
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Pizza Removed from Cart",
      cart,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Clear Entire Cart
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Remove all items from cart
    cart.items = [];

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart Cleared Successfully",
      cart,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getMyCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
};