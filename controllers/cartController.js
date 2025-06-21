const Cart = require("../models/Cart");

exports.getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate(
      "products.product"
    );
    if (!cart)
      return res
        .status(404)
        .json({ status: "error", error: "Carrito no encontrado" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

exports.deleteProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart)
      return res
        .status(404)
        .json({ status: "error", error: "Carrito no encontrado" });
    cart.products = cart.products.filter((p) => p.product.toString() !== pid);
    await cart.save();
    res.json({ status: "success", cart });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

exports.updateCartProducts = async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body; // [{product, quantity}]
    const cart = await Cart.findById(cid);
    if (!cart)
      return res
        .status(404)
        .json({ status: "error", error: "Carrito no encontrado" });
    cart.products = products;
    await cart.save();
    res.json({ status: "success", cart });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

exports.updateProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findById(cid);
    if (!cart)
      return res
        .status(404)
        .json({ status: "error", error: "Carrito no encontrado" });
    const prod = cart.products.find((p) => p.product.toString() === pid);
    if (!prod)
      return res
        .status(404)
        .json({
          status: "error",
          error: "Producto no encontrado en el carrito",
        });
    prod.quantity = quantity;
    await cart.save();
    res.json({ status: "success", cart });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

exports.deleteAllProductsFromCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart)
      return res
        .status(404)
        .json({ status: "error", error: "Carrito no encontrado" });
    cart.products = [];
    await cart.save();
    res.json({ status: "success", cart });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
