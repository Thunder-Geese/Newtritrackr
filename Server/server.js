const path = require("path");
const express = require("express");
const app = express();
const userController = require("./controllers/userController.js");
const mealController = require("./controllers/mealController.js");

const PORT = 3000;

app.use(express.json());

app.use(express.static("Server/assets"));

//user signup
app.post(
  "/user/signup",
  userController.createUser,
  userController.verifyLogin,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);

//user login
app.post("/user", userController.verifyLogin, (req, res) => {
  return res.status(200).json(res.locals);
});

//meals
app.post(
  "/meal/add",
  mealController.addMeals,
  mealController.getMealsInfo,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);

app.post("/meal", mealController.getMealsInfo, (req, res) => {
  console.log("sending to client: ", res.locals);
  return res.status(200).json(res.locals);
});

app.get("/", (req, res) => {
  // console.log("hi", path.join(__dirname, "..", "src/index.html"));
  // res.status(200).sendFile(path.join(__dirname, "..", "index.html"));
  res.send("hi");
});

app.use("/build", express.static(path.join(__dirname, "..", "build")));

//404 handler catch all handler for unknown routes

app.use("*", (req, res) => {
  res.status(404).send("Not Found");
});

//Global error handler -- need to expand and implement error routing in controllers

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Internal Server Error");
});

//start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
