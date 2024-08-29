const Sequelize = require("sequelize");
const sequelizeConnect = require("../connection/database");
const Item = require("./Item");
const Checkout = require("./Checkout")

const Cart = sequelizeConnect.define(
  "cart",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    item_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    checkout_id: {
      type: Sequelize.UUID,
      allowNull: true,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    isChecked: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
  }
);

Cart.belongsTo(Item, {
  foreignKey: "item_id",
  targetKey: "id",
  as: "item",
});

Cart.belongsTo(Checkout, {
  foreignKey: "checkout_id",
  targetKey: "id",
  as: "checkout",
});


module.exports = Cart;
