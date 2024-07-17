const express = require("express");
const port = 3000;
const cors = require("cors");
const connectDB = require("./db/connect.js");
require("dotenv").config();
const { userRouter } = require("./routes/userRoutes.js");
const { todoRouter } = require("./routes/todoRoutes.js");

const app = express();
app.use(
  cors({
    origin: "*", // Allow all origins for development
    methods: ["GET", "POST", "PATCH", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);
connectDB();

app.use(express.json());

app.use("/users", userRouter);
app.use("/todos", todoRouter);

// get "/todos" authenticate the user and display their todos

app.listen(port, () => {
  console.log("Listening for requests");
});
