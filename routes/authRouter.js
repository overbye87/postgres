const Router = require("express");
const router = new Router();
const controller = require("../controllers/authController");
const { check } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");

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
router.post("/users", authMiddleware, controller.getUsers);

module.exports = router;
