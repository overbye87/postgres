const db = require("../db/index");
const User = db.user;

const bcrypt = require("bcrypt");
const saltRounds = 10;

const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const { secret } = require("../config");
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
      const user = User.create({
        name,
        surname,
        email,
        password: hash,
        dob,
        role,
      });
      return res.json({
        status: true,
        user,
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
      const user = await User.findOne({ where: { email: email } });
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
      return res.json({ status: true, token, message: `Login successful` });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: false, message: "Login error" });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (error) {
      return res
        .status(400)
        .json({ status: false, message: `Can not get users` });
    }
  }
}

module.exports = new AuthController();
