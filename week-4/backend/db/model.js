const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const TodoModel = mongoose.model("Todos", todoSchema);

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  todos: [mongoose.Schema.Types.ObjectId],
});

const UserModel = mongoose.model("Users", userSchema);

module.exports = {
  TodoModel,
  UserModel,
};
