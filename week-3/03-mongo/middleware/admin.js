// Middleware for handling auth
const { Admin } = require("../db");

async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const { username } = req.headers;
  const adminExists = await Admin.findOne({ username: username });
  if (!adminExists) {
    res.status(411).json({ msg: "Admin does not exists" });
    return;
  } else {
    next();
  }
}

module.exports = adminMiddleware;
