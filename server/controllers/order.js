const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.addComment = (req, res, next) => {
  const { cartId, comment } = req.body;

  Cart.findOne({
    where: {
      id: cartId,
      status: true,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          status: false,
          message: "Cart doesn't exist",
        });
      } else {
        Order.create({
          cart_id: cartId,
          comment,
        }).then(() => {
          data.status = false;
          data.save();
          return res.status(200).json({
            status: true,
            message: "Comment sent",
          });
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};
