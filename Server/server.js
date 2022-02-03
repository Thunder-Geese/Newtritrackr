const path = require('path');
const express = require('express');
const app = express();
const userController = require('./controllers/userController.js');
const mealController = require('./controllers/mealController.js');
const dbController = require('./controllers/dbController.js');
// require('dotenv').config();
const PORT = 3000;

//////// ******** Mongo DB Connection
// require('dotenv').config();
// const mode = process.env.MODE;
// console.log('MODE', process.env.MODE);
// console.log('PROD DATABASE URI', process.env.DB_PROD_CONNECTION);
// console.log('DEV DATABASE URI', process.env.DB_DEV_CONNECTION);

// const mongoose = require('mongoose');

// if (mode === 'prod') {
//   console.log(process.env.DB_PROD_CONNECTION);
//   const MG_URI = process.env.DB_PROD_CONNECTION;
//   mongoose
//     .connect(MG_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       dbName: 'newtritrakr-prod',
//     })
//     .then(() => console.log('Production database connected'))
//     .catch(() => console.log('Error occured while connecting to database'));
// } else if (mode === 'dev') {
//   console.log(process.env.DB_DEV_CONNECTION);
//   const MG_URI = process.env.DB_DEV_CONNECTION;
//   mongoose
//     .connect(MG_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       dbName: 'newtritrakr-dev',
//     })
//     .then(() => console.log('Development database connected'))
//     .catch(() => console.log('Error occured while connecting to database'));
// }
/////// *****************

app.use(express.json());

//Create route for supertest
app.post('/tests', dbController.connect, mealController.addMeal, (req, res) => {
  console.log('in final middleware of /tests post request');
  return res.status(200).json(res.locals.addedMeal);
});

//user signup
// PTG: Pretty sure verifylogin is unecessary
app.post('/user/signup', userController.createUser, userController.verifyLogin, (req, res) => {
  return res.status(200).json(res.locals);
});

//user login
// PTG: add Router for User
// PTG: change route to /user/login
app.post('/user', userController.verifyLogin, (req, res) => {
  return res.status(200).json(res.locals);
});

//meals
// PTG: add Router for Meals
// -- change to mealS
app.post('/meal/add', mealController.addMeals, mealController.getMealsInfo, (req, res) => {
  return res.status(200).json(res.locals);
});

app.post('/meal', mealController.getMealsInfo, (req, res) => {
  console.log('sending to client: ', res.locals);
  return res.status(200).json(res.locals);
});

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '..', 'index.html'));
});

app.use('/build', express.static(path.join(__dirname, '..', 'build')));

//404 handler catch all handler for unknown routes

app.use((req, res) => {
  console.log('in 404');
  res.status(404).send('Not Found');
});

//Global error handler -- need to expand and implement error routing in controllers

app.use((err, req, res, next) => {
  const errObj = {
    log: 'Error occured',
    message: 'See log',
    status: 500,
  };
  const errMsg = Object.assign({}, errObj, err);
  console.log(errMsg.log);
  return res.status(500).json(errMsg.message);
});

//start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
