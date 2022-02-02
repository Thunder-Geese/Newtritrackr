const path = require('path');
const express = require('express');
const app = express();
const userController = require('./controllers/userController.js');
const mealController = require('./controllers/mealController.js');

const PORT = 3000;

//////// ******** Mongo DB Connection
require('dotenv').config();
const mongoose = require('mongoose');
console.log(process.env.DB_CONNECTION);
const MG_URI = process.env.DB_CONNECTION;

mongoose
  .connect(MG_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'newtritrakr',
  })
  .then(() => console.log('Database connected'))
  .catch(() => console.log('Error occured while connecting to database'));
/////// *****************

app.use(express.json());

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

app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

//Global error handler -- need to expand and implement error routing in controllers

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

//start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
