const zod = require("zod");

const adminValidation = zod.object({
  username: zod.string(),
  password: zod.string(),
});

// Define a custom validator for MongoDB ObjectId
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const objectId = zod.string().refine((val) => objectIdRegex.test(val), {
  message: "Invalid ObjectId",
});

const userValidation = zod.object({
  username: zod.string(),
  password: zod.string(),
  purchasedCourses: zod.array(objectId).optional(),
});

const courseValidation = zod.object({
  title: zod.string(),
  description: zod.string,
  price: zod.number(),
  imageLink: zod.string(),
});

module.exports = {
  adminValidation,
  userValidation,
  courseValidation,
};
