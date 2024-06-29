const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { userValidation } = require("../validation");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const { username, password } = req.body;

  // zod validation
  const response = userValidation.safeParse({ username, password });
  if (!response.success) {
    res.status(403).json({ msg: "Invalid Inputs" });
    return;
  }

  // user already exists
  const user = await User.findOne({ username, password });
  if (user) {
    res.status(403).json({ msg: "Admin already exists" });
    return;
  }

  // create a new user
  const newUser = new User({ username, password });
  await newUser.save();
  res.json({ msg: "User created successfully" });
});

router.post("/signin", async (req, res) => {
  // Implement user signin logic
  const { username, password } = req.body;

  // zod validation
  const response = userValidation.safeParse({ username, password });
  if (!response.success) {
    res.status(403).json({ msg: "Invalid Inputs" });
    return;
  }

  // user doesnt exists
  const user = await User.findOne({ username, password });
  if (!user) {
    res.status(403).json({ msg: "User does not exists" });
    return;
  }

  // sign the user and generate a token
  const token = jwt.sign({ username, password }, "jwtSecret");
  res.json({ token: token });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const allCourses = await Course.find({});
  if (allCourses.length <= 0) {
    res.status(403).json({ msg: "No courses available" });
    return;
  }
  res.json({ courses: allCourses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const { courseId } = req.params;
  const user = req.username;
  
  // check if course exists
  const course = await Course.findById(courseId);
  if (!course) {
    res.status(403).json({ msg: "Course does not exists" });
    return;
  }

  // add to users purchase list
  const updatedUser = await User.findOneAndUpdate(
    user,
    { $push: { purchasedCourses: courseId } },
    { new: true }
  );

  res.json({ msg: "Course purchased successfully" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const loggedUser = jwt.verify(req.headers.authorization, "jwtSecret");

  const user = await User.findOne(loggedUser);
  const purchasedCourses = user.purchasedCourses;

  if (purchasedCourses.length <= 0) {
    res.status(403).json({ msg: "No purchased courses." });
    return;
  }

  const courses = Course.find({ _id: { $in: purchasedCourses } });
  res.json({ purchasedCourses: courses });
});

module.exports = router;
