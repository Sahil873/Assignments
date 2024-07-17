const express = require("express");
const router = express.Router();
const { UserModel } = require("../db/model.js");
const jwtSecret = process.env.jwtSecret;
const jwt = require("jsonwebtoken");
const { validUser } = require("../middleware.js");

// signup - add user to DB
router.post("/signup", validUser, async (req, res) => {
  const newUser = req.body;
  console.log("In signup");

  try {
    const isUserPresent = await UserModel.findOne(newUser);
    if (isUserPresent) {
      res.status(403).json({ msg: "User already present in DB. Sign In now" });
      return;
    }
    const createdUser = await UserModel.create(newUser);
    res.json({ msg: "User Created Successfully. Sign In now" });
  } catch (err) {
    res.status(500).json({ msg: "Unable to create user" });
  }
});

// singin / login - authorize user and return a token
router.post("/signin", validUser, async (req, res) => {
  const loggedUser = req.body;

  const isUserPresent = await UserModel.findOne(loggedUser);
  if (!isUserPresent) {
    res.status(403).json({ msg: "User not present in DB. Sign Up first" });
    return;
  }

  const payload = { user: { id: isUserPresent._id } };
  const token = jwt.sign(payload, jwtSecret);
  res.json({ msg: "User Logged In Successfully", token });
});

module.exports = { userRouter: router };
