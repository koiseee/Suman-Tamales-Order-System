const Sequelize = require("sequelize");
const sequelizeConnect = require("../connection/database");

const Checkout = sequelizeConnect.define(
  "checkout",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    full_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone_number: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [1, 11],
      },
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    address: {
      type: Sequelize.ENUM("Local Store", "Public Market"),
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

module.exports = Checkout;
