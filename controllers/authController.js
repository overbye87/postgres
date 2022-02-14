const db = require("../models");
const User = db.User;

const bcrypt = require("bcrypt");
const saltRounds = 10;

const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const { secret } = require("../secret");

// role (string) is "admin" or "user"
const generateAccessToken = (id, role) => {
  const payload = {
    id,
    role,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      // check input validation
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ status: false, message: "Validation failed", ...errors });
      }
      const { name, surname, email, password, dob, role } = req.body;
      // check existing email
      const candidate = await User.findOne({ where: { email: email } });
      if (candidate) {
        return res.status(400).json({
          status: false,
          message: "Email alredy exist",
        });
      }
      // calculate hash and creation user
      const hash = await bcrypt.hash(password, saltRounds);
      const user = await User.create({
        name,
        surname,
        email,
        password: hash,
        dob,
        role,
      });
      const responseUser = await User.findOne({
        where: { email: email },
        raw: true,
      });
      delete responseUser.password;
      return res.json({
        status: true,
        user: responseUser,
        message: `User with ${email} successfully registered`,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ status: false, message: "Registration error" });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email: email }, raw: true });
      if (!user) {
        return res
          .status(400)
          .json({ status: false, message: `User with ${email} not found` });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res
          .status(400)
          .json({ status: false, message: `Password is incorrect` });
      }
      // generate token
      const token = generateAccessToken(user.id, user.role);
      delete user.password;
      return res.json({
        status: true,
        token,
        user: user,
        message: `Login successful`,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: false, message: "Login error" });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.findAll({
        raw: true,
      });
      const responseUsers = users.map((user) => {
        delete user.password;
        return user;
      });

      return res.json({
        status: true,
        users: responseUsers,
        message: `Users retrieved successfully`,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ status: false, message: `Can not get users` });
    }
  }
  async getOneUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, { raw: true });
      delete user.password;
      return res.json({
        status: true,
        user,
        message: `User with id:${id} retrieved successfully`,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ status: false, message: `Can not get user with id:${id}` });
    }
  }
  async updateUser(req, res) {
    try {
      const { id, name, surname, email, password, dob, role } = req.body;
      if (typeof id !== "number") {
        return res.status(400).json({ status: false, message: `Incorrect id` });
      }
      const user = await User.findByPk(id, { raw: true });
      if (!user) {
        return res
          .status(400)
          .json({ status: false, message: `Can not get user with id:${id}` });
      }
      const status = await User.update(
        {
          name,
          surname,
          email,
          password,
          dob,
          role,
        },
        { where: { id: id } }
      );
      const responseUser = await User.findByPk(id, { raw: true });
      delete responseUser.password;
      return res.json({
        status: true,
        user: responseUser,
        message: `Data of user with id:${id} successfully changed`,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: `Can not change data of user with id:${id}`,
      });
    }
  }
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const result = await User.destroy({
        where: { id: id },
      });
      if (!result) {
        return res.status(400).json({
          status: false,
          message: `There is no user with id:${id}`,
        });
      }
      return res.json({
        status: true,
        message: `User with id:${id} deleted successfully`,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ status: false, message: `Can not delete user with id:${id}` });
    }
  }
}

module.exports = new AuthController();
