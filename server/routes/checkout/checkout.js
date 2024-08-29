const express = require("express");
const validation = require("../../middleware/route-validation");
const { body, param } = require("express-validator");

const router = express.Router();

const { checkoutOrder, viewCheckout } = require("../../controllers/checkout");

router.post(
  "/checkout-item",
  [body("full_name").notEmpty()],
  [body("phone_number").isNumeric().notEmpty().isLength({ max: 11 })],
  [body("date").notEmpty()],
  [body("address").notEmpty()],
  validation,
  checkoutOrder
);

router.get("/view-checkout", viewCheckout);

module.exports = router;
