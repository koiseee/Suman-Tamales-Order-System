const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Item = require("../models/Item");

exports.checkoutOrder = (req, res, next) => {
  const { full_name, phone_number, date, address } = req.body;

  Cart.findAll({
    where: {
      isChecked: true,
      status: true,
    },
  })
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Cart is empty",
        });
      } else {
        return Checkout.create({
          full_name,
          phone_number,
          date,
          address,
        }).then((checkout) => {
          const cartItemIds = data.map((item) => item.id);

          return Cart.update(
            { checkout_id: checkout.id },
            { where: { id: cartItemIds } }
          ).then(() => {
            res.status(200).json({
              success: true,
              message: "Items have been checked out!",
            });
          });
        });
      }
    })

    .catch((err) => {
      next(err);
    });
};

// Update checked items with checkout_id
// const cartItemIds = cartItems.map(item => item.id);
// await Cart.update(
//   { checkout_id: checkout.id },
//   { where: { id: cartItemIds } }
// );

exports.viewCheckout = (req, res, next) => {
  Cart.findAll({
    include: [
      {
        model: Item,
        as: "item",
      },
      {
        model: Checkout,
        as: "checkout",
      },
    ],
  })
    .then((data) => {
      if (data.length === 0) {
        return res.status(400).json({
          status: false,
          message: "There's no order yet",
        });
      }

      const all_cart = data.map((cart) => ({
        id: cart.id,
        item: {
          id: cart.item.id,
          food_name: cart.item.food_name,
          price: cart.item.price,
          item_img: cart.item.item_img,
        },
        checkout: {
          id: cart.checkout.id,
          full_name: cart.checkout.full_name,
          phone_number: cart.checkout.phone_number,
          date: cart.checkout.date,
          address: cart.checkout.address,
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
