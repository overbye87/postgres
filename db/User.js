const Sequilize = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define(
    "user",
    {
      id: {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequilize.STRING,
        allowNull: true,
      },
      surname: {
        type: Sequilize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequilize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequilize.STRING,
        allowNull: false,
      },
      dob: {
        type: Sequilize.STRING,
        allowNull: true,
      },
      role: {
        type: Sequilize.STRING,
        allowNull: true,
      },
    },
    { timestamps: false, tableName: "user" }
  );
};
