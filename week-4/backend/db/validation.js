const zod = require("zod");

const validateTodo = zod.object({
  title: zod.string(),
  description: zod.string(),
});

const validateUser = zod.object({
  username: zod.string(),
  password: zod.string().min(8),
});

module.exports = {
  validateTodo,
  validateUser,
};
