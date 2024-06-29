const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

  // get token from header
  const bearerToken = req.headers.authorization;
  const token = bearerToken.split(" ")[1];

  // verify token
  try {
    const decoded = jwt.verify(token, "jwtSecret");
    req.username = decoded.username;
    next();
  } catch (e) {
    res.status(403).json({ msg: "Invalid Admin" });
    return;
  }
}

module.exports = userMiddleware;
