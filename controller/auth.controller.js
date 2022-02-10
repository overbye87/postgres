const db = require("../db/index");
const User = db.user;

const bcrypt = require("bcrypt");
const saltRounds = 10;

class AuthController {
  async registration(req, res) {
    try {
      const { email, password } = req.body;
      const candidate = await User.findOne({ where: { email: email } });
      if (candidate) {
        return res.status(400).json({ message: "Email alredy exist" });
      }
      console.log(password);
      const hash = await bcrypt.hash(password, saltRounds);
      console.log(hash);
      const user = User.create({
        email: email,
        password: hash,
      });
      res.json({ message: `User ${email} successfully registered` });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Registration error" });
    }
  }
  async login(req, res) {
    try {
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Login error" });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {}
  }
}

module.exports = new AuthController();
