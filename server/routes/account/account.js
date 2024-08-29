const express = require("express");
const { body, param } = require("express-validator");
const jsonParser = require("../../helpers/jsonParser");
const validation = require("../../middleware/route-validation");
const User = require("../../models/User");
const router = express.Router();

const { signUp, login } = require("../../controllers/account");

router.post(
  "/sign-up",
  [
    body("first_name").notEmpty(),
    body("last_name").notEmpty(),
    body("phone_number").notEmpty().isMobilePhone(),
    body("password").notEmpty(),
    body("confirm_password").notEmpty()
  ],
  validation,
  signUp
);



router.post(
  "/login",
  [
    body("phone_number").notEmpty().isMobilePhone(),
    body("password").notEmpty(),
  ],
  validation,
  login
);

module.exports = router;
