const { User } = require("../db");

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const { username } = req.headers;
  const userExists = await User.findOne({ username: username });
  if (!userExists) {
    res.status(411).json({ msg: "User doesn't exists in db" });
    return;
  } else {
    next();
  }
}

module.exports = userMiddleware;
