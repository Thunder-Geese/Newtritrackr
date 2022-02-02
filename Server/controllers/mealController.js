const meal = require('../models/mealModel');
const axios = require('axios');
const mealController = {};

//NEED TO ADD ERROR HANDLING

//controller to retrieve meal information
mealController.getMealsInfo = (req, res, next) => {
  // PTG: Rewrite for Mongo
  console.log('server got, ', req.body);
  let user_id = Number(req.body.user_id);
  console.log(user_id);
  const mealsInfo = `SELECT * FROM meal WHERE user_id = ${user_id}`;
  meal.query(mealsInfo).then(data => {
    if (data.rows) {
      console.log('data from query,', data.rows);
      res.locals = data.rows;
      next();
    }
  });
};

//controller to add a meal to the DB
mealController.addMeals = (req, res, next) => {
  console.log('adding a meal');

  // PTG: build out more nutrient info
  let nutrientObject = {
    protein: 0,
    fat: 0,
    carbs: 0,
    calories: 0,
  };

  try {
    queryApi();
  } catch {
    console.log('error');
  }

  //async func to query the edamam API
  // PTG: Switch to nutrition api on edamam instead of meals
  async function queryApi() {
    for (let i = 0; i < req.body.ingredients.length; i++) {
      let apiSearch = `https://api.edamam.com/api/food-database/v2/parser?app_id=f7bc40de&app_key=72cc5c040a857910e84239e6daad750c&ingr=${req.body.ingredients[i]}`;
      await axios.get(apiSearch).then(data => {
        console.log(data.data.hints[0].food.nutrients.PROCNT);
        nutrientObject.protein += data.data.hints[0].food.nutrients.PROCNT;
        nutrientObject.fat += data.data.hints[0].food.nutrients.FAT;
        nutrientObject.carbs += data.data.hints[0].food.nutrients.CHOCDF;
        nutrientObject.calories += data.data.hints[0].food.nutrients.ENERC_KCAL;
      });
    }
    return addToDatabase();
  }

  //func to add to the SQL database
  // PTG: Add meal name, description, ingredients and amounts to DB as well as nutitrional info
  // PTG: add newly created meal id to users meal prop
  function addToDatabase() {
    let { protein, fat, carbs, calories } = nutrientObject;
    protein = Math.floor(protein);
    fat = Math.floor(fat);
    carbs = Math.floor(carbs);
    const currentDate = new Date().toLocaleString();

    const addFood = `INSERT INTO meal (user_id, date, protein, fat, carbs, calories, meal_name)
                   VALUES ('${req.body.user_id}', '${currentDate}', '${protein}', '${fat}', '${carbs}', '${calories}', '${req.body.meal_name}')`;
    meal.query(addFood).then(data => {
      return next();
    });
  }
};

module.exports = mealController;
