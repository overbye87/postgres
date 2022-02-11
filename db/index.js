const Sequilize = require("sequelize");
const sequelize = new Sequilize("postgres://postgres:root@localhost:5432/node");

const User = require("./User.js")(sequelize);

module.exports = {
  sequelize: sequelize,
  user: User,
};
