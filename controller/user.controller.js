const db = require("../db/index");

const User = db.user;
class UserController {
  async createUser(req, res) {
    const { name, surname } = req.body;
    const newUser = await User.create({
      name: name,
      surname: surname,
    });
    res.json(newUser);
  }
  async getUsers(req, res) {
    //const users = await db.query("SELECT * FROM user");
    const users = await User.findAll();
    res.json(users);
  }
  async getOneUser(req, res) {
    const id = req.params.id;
    //const user = await db.query("SELECT * FROM user where id = $1", [id]);
    const user = await User.findByPk(id);
    res.json(user);
  }
  async updateUser(req, res) {
    const { id, name, surname } = req.body;
    // const user = await db.query(
    //   "UPDATE user set name = $1, surname = $2 where id = $3 RETURNING *",
    //   [name, surname, id]
    // );
    const status = await User.update(
      {
        name: name,
        surname: surname,
      },
      { where: { id: id } }
    );
    const user = await User.findByPk(id);
    res.json({
      user,
      status: !!status[0],
    });
  }
  async deleteUser(req, res) {
    const id = req.params.id;
    //const user = await db.query("DELETE FROM user where id = $1", [id]);
    const user = await User.destroy({
      where: { id: id },
    });
    res.json(!!user);
  }
}

module.exports = new UserController();
