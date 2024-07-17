const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { UserModel, TodoModel } = require("../db/model.js");
const { validTodo, authenticateUser } = require("../middleware.js");

router.get("/", authenticateUser, async (req, res) => {
  console.log("In get todos route");
  const { user } = req;

  try {
    const User = await UserModel.findById(user.id);
    const UserTodos = await TodoModel.find({ _id: { $in: User.todos } });
    res.json({ todos: UserTodos });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ msg: "Unable to get todos" });
  }
});

// post "/todos" authenticate the user and add the todo
router.post("/", authenticateUser, validTodo, async (req, res) => {
  const { user } = req;
  const todo = req.body;

  try {
    const createTodo = await TodoModel.create(todo);
    const updatedUser = await UserModel.findByIdAndUpdate(
      user.id,
      { $push: { todos: createTodo._id } },
      { new: true }
    );
    console.log(updatedUser);
    res.json({ msg: "Todo created successfully" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ msg: "Unable to create todo or update in user" });
  }
});

// patch "/todo/:id" authenticate the user and update the todo
router.patch("/:id", authenticateUser, validTodo, async (req, res) => {
  const { id } = req.params;
  const newTodo = req.body;

  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(id, newTodo, {
      new: true,
    });
    console.log(updatedTodo);
    res.json({ msg: "Todo Updated Successfully" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ msg: "Unable to update Todo" });
  }
});

// delete "/todo/:id" authenticate the user and delete the todo
router.delete("/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  try {
    await TodoModel.findByIdAndDelete(id);
    console.log("Todo Deleted");
    await UserModel.findByIdAndUpdate(
      user.id,
      { $pull: { todos: new mongoose.Types.ObjectId(id) } },
      { new: true }
    );
    console.log("Todo Deleted from user too ");
    res.json({ msg: "Todo Deleted and updated in user" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ msg: "Unable to delete todo" });
  }
});

module.exports = { todoRouter: router };
