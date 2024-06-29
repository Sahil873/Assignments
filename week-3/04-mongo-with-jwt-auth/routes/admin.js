const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");
const jwt = require("jsonwebtoken");
const { courseValidation, adminValidation } = require("../validation");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;

  // zod validation
  const response = adminValidation.safeParse({ username, password });
  if (!response.success) {
    res.status(403).json({ msg: "Invalid Inputs" });
    return;
  }

  // admin already exists
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    res.status(403).json({ msg: "Admin already exists" });
    return;
  }

  // create a new admin
  const newAdmin = new Admin({ username, password });
  await newAdmin.save();
  res.json({ msg: "Admin created successfully" });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;

  // zod validation
  const response = adminValidation.safeParse({ username, password });
  if (!response.success) {
    res.status(403).json({ msg: "Invalid Inputs" });
    return;
  }

  // admin already exists
  const admin = await Admin.findOne({ username, password });
  if (!admin) {
    res.status(403).json({ msg: "Admin does not exists" });
    return;
  }

  // sign the admin and generate a token
  const token = jwt.sign({ username, password }, "jwtSecret");
  res.json({ token: token });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const course = req.body;
  console.log(course);

  // zod validation
  const response = courseValidation.safeParse(course);
  if (!response.success) {
    res.status(403).json({ msg: "Invalid Inputs" });
    return;
  }

  // check if course already exists
  const courseExists = await Course.findOne(course);
  if (courseExists) {
    res.status(403).json({ msg: "Course already exists" });
    return;
  }

  // create a new course
  const newCourse = new Course(course);
  newCourse.save();
  res.json({ msg: "Course created successfully", courseId: newCourse._id });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const allCourses = await Course.find({});
  if (allCourses.length <= 0) {
    res.status(403).json({ msg: "No courses available" });
    return;
  }
  res.json({ courses: allCourses });
});

module.exports = router;
