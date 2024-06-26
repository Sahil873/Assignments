// Middleware for handling auth
const { Admin } = require("../db");

async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const { username, password } = req.headers;
  const adminExists = await Admin.findOne({
    username: username,
    password: password,
  });
  if (!adminExists) {
    res.status(403).json({ msg: "Admin does not exists" });
    return;
  } else {
    next();
  }
}

module.exports = adminMiddleware;
