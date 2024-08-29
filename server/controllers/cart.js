const { where } = require("sequelize");
const Cart = require("../models/Cart");
const Item = require("../models/Item");

exports.addToCart = (req, res, next) => {
  const { quantity } = req.body;
  const { itemId } = req.params;

  Cart.create({
    item_id: itemId,
    quantity,
  })
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Item added",
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.viewCart = (req, res, next) => {
  Cart.findAll({
    include: [
      {
        model: Item,
        as: "item",
      },
    ],
  })
    .then((user) => {
      if (user.length === 0) {
        return res.status(400).json({
          status: false,
          message: "There's no available",
        });
      }

      const all_cart = user.map((cart) => ({
        id: cart.id,
        item: {
          id: cart.item.id,
          food_name: cart.item.food_name,
          price: cart.item.price,
          item_img: cart.item.item_img,
        },
        quantity: cart.quantity,
        isChecked: cart.isChecked,
      }));
      return res.status(200).json({ success: true, all_cart });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteItem = (req, res, next) => {
  const { orderId } = req.body;

  Cart.findOne({
    where: {
      id: orderId,
      status: true,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          status: false,
          message: "Item not found",
        });
      } else {
        data.destroy();
        return res.status(200).json({
          success: false,
          message: "Item deleted",
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateCart = (req, res, next) => {
  const { orderId, quantity, isChecked } = req.body;

  // Build the update object conditionally
  const updateData = {};
  if (quantity !== undefined) {
    updateData.quantity = quantity;
  }
  if (isChecked !== undefined) {
    updateData.isChecked = isChecked;
  }

  Cart.update(updateData, {
    where: {
      id: orderId,
      status: true,
    },
  })
    .then((result) => {
      if (result[0] === 0) {
        return res.status(404).json({
          success: false,
          message: "Item not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Item updated",
      });
    })
    .catch((err) => {
      next(err);
    });
};
