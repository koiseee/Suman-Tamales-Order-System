const express = require("express");
const { body, param } = require("express-validator");
const validation = require("../../middleware/route-validation");
const router = express.Router();

const {
  addToCart,
  viewCart,
  deleteItem,
  updateCart,
} = require("../../controllers/cart");

router.post(
  "/:itemId/add-item",
  [body("quantity").notEmpty()],
  validation,
  addToCart
);

router.get("/view-cart", viewCart);

router.delete("/delete-item", deleteItem);

router.put(
  "/update-item",
  [body("orderId").notEmpty().isUUID(), body("quantity").optional()],
  [body("isChecked").optional().isBoolean()],
  validation,
  updateCart
);

module.exports = router;
