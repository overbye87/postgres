const Sequilize = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define(
    "person",
    {
      id: {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequilize.STRING,
        allowNull: false,
      },
      surname: {
        type: Sequilize.STRING,
        allowNull: false,
      },
    },
    { timestamps: false, tableName: "person" }
  );
};
