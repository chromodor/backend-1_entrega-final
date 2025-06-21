const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getProducts);
router.get("/:pid", productController.getProductById);

module.exports = router;
