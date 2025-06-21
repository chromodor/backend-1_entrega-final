const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/:cid", cartController.getCartById);
router.delete("/:cid/products/:pid", cartController.deleteProductFromCart);
router.put("/:cid", cartController.updateCartProducts);
router.put("/:cid/products/:pid", cartController.updateProductQuantity);
router.delete("/:cid", cartController.deleteAllProductsFromCart);

module.exports = router;
