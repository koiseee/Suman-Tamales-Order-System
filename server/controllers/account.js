const bcrypt = require("bcryptjs");
const errorHandler = require("../utils/errorHandler");
const User = require("../models/User");
const { where } = require("sequelize");

exports.signUp = (req, res, next) => {
  const { first_name, last_name, phone_number, password, confirm_password } =
    req.body;

  if (password !== confirm_password) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match!",
    });
  }

  User.findOne({
    where: {
      phone_number: phone_number,
      status: true,
    },
  })
    .then((user) => {
      if (user) {
        return res.status(400).json({
          success: false,
          message: "Phone number already exists!",
        });
      } else {
        return User.create({
          first_name,
          last_name,
          phone_number,
          password,
        });
      }
    })
    .then(() => {
      res.status(200).json({
        success: true,
        message: "User created successfully!",
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.login = (req, res, next) => {
  const { phone_number, password } = req.body;
  let userInfo;
  User.findOne({
    where: {
      phone_number: phone_number,
      status: true,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      } else {
        userInfo = user;

        // return bcrypt.compare(password, user.password);
      }
    })
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Login success!",
      });
    })
    .catch((err) => {
      next(err);
    });
};
