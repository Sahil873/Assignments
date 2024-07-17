const { validateTodo, validateUser } = require("./db/validation.js");
const jwtSecret = process.env.jwtSecret;
const jwt = require("jsonwebtoken");

function validUser(req, res, next) {
  const user = req.body;
  const validateResponse = validateUser.safeParse(user);
  if (!validateResponse.success) {
    res.status(401).json({ msg: "Invalid Inputs" });
  } else {
    next();
  }
}
function validTodo(req, res, next) {
  const todo = req.body;
  console.log(todo);
  const validateResponse = validateTodo.safeParse(todo);
  if (!validateResponse.success) {
    res.status(401).json({ msg: "Invalid Inputs" });
  } else {
    next();
  }
}

function authenticateUser(req, res, next) {
  const token = req.headers.authorization;
  console.log("in authenticate user");
  try {
    const decodedUser = jwt.verify(token, jwtSecret);
    req.user = decodedUser.user;
  } catch (err) {
    res.status(403).json({ msg: "User not Authenticated from middleware" });
    return;
  }
  next();
}

module.exports = {
  validTodo,
  validUser,
  authenticateUser,
};
