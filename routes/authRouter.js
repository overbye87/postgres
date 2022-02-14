const Router = require("express");
const router = new Router();
const controller = require("../controllers/authController");
const { check } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.post(
  "/registration",
  [
    check("email", "Email must be correct and cannot be empty")
      .normalizeEmail()
      .isEmail()
      .notEmpty(),
    check(
      "password",
      "Password length must be more than three characters"
    ).isLength({ min: 3 }),
  ],
  controller.registration
);
router.post("/login", controller.login);
router.get("/user", roleMiddleware("admin"), controller.getUsers);
router.get("/user/:id", roleMiddleware("admin"), controller.getOneUser);
router.put(
  "/user",
  [check("id", "id must be correct and cannot be empty").notEmpty()],
  roleMiddleware("admin"),
  controller.updateUser
);
router.delete("/user/:id", roleMiddleware("admin"), controller.deleteUser);

module.exports = router;
