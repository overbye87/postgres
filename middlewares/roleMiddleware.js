const jwt = require("jsonwebtoken");
const { secret } = require("../config");

// role (string) is "admin" or "user"
module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      //Authorization: Bearer <token>
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res
          .status(403)
          .json({ status: false, message: "No token. User is not authorized" });
      }
      const { role: userRoles } = jwt.verify(token, secret);
      console.log("Roles from token: ", userRoles);
      let hasRole = false;
      if (userRoles === roles) {
        hasRole = true;
      }
      if (!hasRole) {
        return res
          .status(403)
          .json({ status: false, message: "Insufficient rights to access" });
      }
      next();
    } catch (error) {
      console.log(error);
      return res
        .status(403)
        .json({ status: false, message: "User is not authorized" });
    }
  };
};
