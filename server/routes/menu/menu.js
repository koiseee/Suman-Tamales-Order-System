const express = require("express");
const validation = require("../../middleware/route-validation");
const { body, param } = require("express-validator");

const router = express.Router();

const { allMenu } = require("../../controllers/menu");

router.get("/all-menu", allMenu);

module.exports = router;