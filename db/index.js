const Sequilize = require("sequelize");
const sequelize = new Sequilize("postgres://postgres:root@localhost:5432/node");

const Person = require("./Person.js")(sequelize);

module.exports = {
  sequelize: sequelize,
  person: Person,
};
