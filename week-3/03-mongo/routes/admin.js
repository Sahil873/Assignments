const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;

  const adminExists = await Admin.findOne({ username: username });
  if (adminExists) {
    res.status(403).json({ msg: "Admin already exists" });
    return;
  }

  const newAdmin = new Admin({ username: username, password: password });
  await newAdmin.save();

  res.json({ msg: "Admin created successfully", admin: newAdmin });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const { title, description, price, imageLink } = req.body;

  const courseExists = await Course.findOne({ title });
  if (courseExists) {
    res.status(400).json({ msg: "Course already exists" });
  }

  const course = new Course({ title, description, price, imageLink });
  await course.save();

  res.json({
    message: "Course created successfully",
    courseId: course._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const allCourses = await Course.find({});
  if (allCourses.length <= 0) {
    res.status(400).json({ msg: "No Courses in the Course DB" });
    return;
  }
  res.json(allCourses);
});

module.exports = router;
