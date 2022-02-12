const Sequilize = require("sequelize");
//  npx sequelize-cli model:generate --name User --attributes name:string,surname:string,email:string,password:string,dob:string,role:string
module.exports = function (sequelize) {
  return sequelize.define(
    "user",
    {
      id: {
        autoIncrement: true,
        type: Sequilize.INTEGER,
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
