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
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Validation failed", ...errors });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ where: { email: email } });
      if (candidate) {
        return res.status(400).json({ message: "Email alredy exist" });
      }
      const hash = await bcrypt.hash(password, saltRounds);
      const user = User.create({
        email: email,
        password: hash,
      });
      return res.json({
        message: `User with ${email} successfully registered`,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Registration error" });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return res
          .status(400)
          .json({ message: `User with ${email} not found` });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Password is incorrect` });
      }
      const token = generateAccessToken(user.id, user.role);

      return res.json({ token });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Login error" });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (error) {}
  }
}

module.exports = new AuthController();
