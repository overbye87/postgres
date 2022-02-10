const Sequilize = require("sequelize");
const sequelize = new Sequilize("postgres://postgres:root@localhost:5432/node");

const Person = require("./Person.js")(sequelize);
const User = require("./User.js")(sequelize);

module.exports = {
  sequelize: sequelize,
  person: Person,
  user: User,
};
