const { query } = require("express");
const cartCollections = require("../model/Carts");
const Carts = require("../model/Carts");

// getting carts using email
const getCartsByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const query = { email: email };
    const result = await cartCollections.find(query).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// posting cartItem to db

const addToCart = async (req, res) => {
  const { menuItemId, name, recipe, image, price, quantity, email } = req.body;
  try {
    // existing menu item
    const existingCartItem = await Carts.findOne({ menuItemId });
    if (existingCartItem) {
      return res
        .status(400)
        .json({ message: "Product already exists in cart!" });
    }
    const cartItem = await Carts.create({
      menuItemId,
      name,
      recipe,
      image,
      price,
      quantity,
      email,
    });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete cartItem from db

const deleteCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const deletedCart = await Carts.findOneAndDelete(cartId);
    if (!deletedCart) {
      return res.status(401).json({ message: "Cart Items not found!" });
    }
    res.status(200).json({ message: "Cart Item Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update a cart Item
const updateCart = async (req, res) => {
  const cartId = req.params.id;
  const { menuItemId, name, recipe, image, price, quantity, email } = req.body;
  try {
    const updatedCart = await Carts.findByIdAndUpdate(
      cartId,
      { menuItemId, name, recipe, image, price, quantity, email },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedCart) {
      return res.status(404).json({ message: "Cart Item not found!" });
    }
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single recipe
const getSingleCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const cartItem=await Carts.findById(cartId)
    res.status(200).json(cartItem);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCartsByEmail, addToCart, deleteCart, updateCart,getSingleCart };
