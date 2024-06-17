const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const { username, password } = req.body;

  const userExists = await User.findOne({ username: username });
  if (userExists) {
    res.status(400).json({ msg: "Admin already exists" });
    return;
  }

  const user = new User({ username: username, password: password });
  await user.save();

  res.json({ msg: "User created successfully", user: user });
});

router.get("/courses", userMiddleware, async (req, res) => {
  // Implement listing all courses logic
  const allCourses = await Course.find({});
  if (allCourses.length <= 0) {
    res.status(400).json({ msg: "No Courses in the Course DB" });
    return;
  }
  res.json(allCourses);
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const { username } = req.headers;
  // Implement course purchase logic
  const { courseId } = req.params;

  const courseExists = await Course.findById(courseId);
  if (!courseExists) {
    res.status(411).json({ msg: "Course doesn't exist in Course DB" });
    return;
  }

  const updatedUser = await User.findOneAndUpdate(
    { username },
    { $push: { purchasedCourses: courseExists._id } },
    { new: true }
  );
  console.log(updatedUser);

  res.json({ msg: "Course purchased successfully" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const { username } = req.headers;

  const user = await User.findOne({ username }).populate("purchasedCourses");
  const userCourses = user.purchasedCourses;
  if (!userCourses) {
    res.status(400).json({ msg: "User had not purchased any course" });
    return;
  }

  res.json({ purchasedCourses: userCourses });
});

module.exports = router;
