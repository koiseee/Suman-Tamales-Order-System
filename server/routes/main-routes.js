const express = require("express");
const router = express.Router();

const accountRoute = require("./account/account");
const menuRoute = require("./menu/menu");
const cartRoute = require("./cart/cart");
const checkoutRoute = require("./checkout/checkout");

router.use("/account", accountRoute);
router.use("/menu", menuRoute);
router.use("/cart", cartRoute);
router.use("/checkout", checkoutRoute);

module.exports = router;
