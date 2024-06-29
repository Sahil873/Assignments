const jwt = require("jsonwebtoken");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

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

module.exports = adminMiddleware;
