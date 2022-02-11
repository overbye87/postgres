const db = require("../db/index");
const Person = db.person;

class UserController {
  async createUser(req, res) {
    const { name, surname } = req.body;
    const newPerson = await Person.create({
      name: name,
      surname: surname,
    });
    res.json(newPerson);
  }
  async getUsers(req, res) {
    //const users = await db.query("SELECT * FROM person");
    const users = await Person.findAll();
    res.json(users);
  }
  async getOneUser(req, res) {
    const id = req.params.id;
    //const user = await db.query("SELECT * FROM person where id = $1", [id]);
    const user = await Person.findByPk(id);
    res.json(user);
  }
  async updateUser(req, res) {
    const { id, name, surname } = req.body;
    // const user = await db.query(
    //   "UPDATE person set name = $1, surname = $2 where id = $3 RETURNING *",
    //   [name, surname, id]
    // );
    const status = await Person.update(
      {
        name: name,
        surname: surname,
      },
      { where: { id: id } }
    );
    const user = await Person.findByPk(id);
    res.json({
      user,
      status: !!status[0],
    });
  }
  async deleteUser(req, res) {
    const id = req.params.id;
    //const user = await db.query("DELETE FROM person where id = $1", [id]);
    const user = await Person.destroy({
      where: { id: id },
    });
    res.json(!!user);
  }
}

module.exports = new UserController();
