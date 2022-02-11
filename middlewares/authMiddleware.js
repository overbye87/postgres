const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = function (req, res, next) {
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
    const decodedData = jwt.verify(token, secret);
    console.log("Tocken check: ", decodedData);
    req.user = decodedData;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ status: false, message: "User is not authorized" });
  }
};
