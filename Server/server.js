const path = require('path');
const express = require('express');
const app = express();
const userController = require('./controllers/userController.js');
const mealController = require('./controllers/mealController.js')

const PORT = 3000;



app.use(express.json());

//do we need this to get to display /user login/signup page
// app.get('/', (req, res) => {});

//user login
app.post('/user', userController.verifyLogin, (req, res) => {
  res.status(200).json(res.locals.info);
});


//user signup 
app.post('/user/signup', userController.createUser, (req, res) => {
  res.status(200).json(res.locals)
});

//meals
app.get('/meal', mealController.getMealsInfo, (req, res) => {
  res.status(200)
});

app.post('/meal', mealController.addMeals, (req, res) => {
  res.status(200)
});



 //404 handler catch all handler for unknown routes

 app.use('*', (req,res) => {
  res.status(404).send('Not Found');
});


//Global error handler


 app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});



//start server 
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });

