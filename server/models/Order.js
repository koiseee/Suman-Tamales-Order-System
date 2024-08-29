const Sequelize = require("sequelize");
const sequelizeConnect = require("../connection/database");

const Order = sequelizeConnect.define(
  "order",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    cart_id: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    comment: {
      type: Sequelize.TEXT,
      allowNull: false,
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

module.exports = Order;
