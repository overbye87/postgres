"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "John",
          surname: "Doe",
          email: "admin@admin.ru",
          password: bcrypt.hashSync("admin", saltRounds),
          dob: "10.10.2010",
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jane",
          surname: "Doe",
          email: "user@user.ru",
          password: bcrypt.hashSync("user", saltRounds),
          dob: "10.10.2010",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
