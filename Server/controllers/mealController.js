const mealModel = require('../models/mealModel');
const axios = require('axios');
const mealController = {};

//// add meal to db
mealController.addMeal = (req, res, next) => {
  console.log('in addmeal middleware');
  // console.log('Request Object', req);
  const { username, mealInfo } = req.body;
  console.log('mealInfo', mealInfo);
  mealModel
    .create(mealInfo)
    .then(result => {
      res.locals.addedMeal = result;
      return next();
    })
    .catch(err => {
      return next({
        log: `Error in mealController.addMeal. ERROR: ${err}`,
        message: 'Error in mealController.addMeal. See log for more details.',
      });
    });

  // grab meal id after creating entry
  // add meal id to username document meals property

  // mealModel
  //   .create({
  //     name: 'GOULASH',
  //     description: 'Does this one have 4 ingredient objects in the ingredients array?',
  //     type: '4 ingredients',
  //     ingredients: [
  //       {
  //         name: 'spaghetti',
  //         amount: 2,
  //         unit: 'cups',
  //       },
  //     ],
  //   })
  //   .then(result => {
  //     res.locals.addedMeal = result;
  //     return next();
  //   })
  //   .catch(err => {
  //     return next({
  //       log: `Error in mealController.addMeal. ERROR: ${err}`,
  //       message: 'Error in mealController.addMeal. See log for more details.',
  //     });
  //   });
};
//// find that meal and read it
function testfind() {
  console.log('reading meals from db');
  mealModel
    .find({})
    .then(result => {
      console.log(result);
      console.log(result[result.length - 1].ingredients);
    })
    .catch(err => console.log(err));
}
function testdb() {
  console.log('adding meal to db');
  mealModel
    .create({
      name: 'THIS GOES TO PROD DB 1',
      description: 'Does this one have 4 ingredient objects in the ingredients array?',
      type: '4 ingredients',
      ingredients: [
        {
          name: 'spaghetti',
          amount: 2,
          unit: 'cups',
        },
      ],
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
}
// mealController.addMeal();

// testdb();
// testfind();

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
mealController.queryAPI = async (req, res, next) => {
  console.log('querying api middleware');

  // PTG: build out more nutrient info

  // let nutrientObject = {
  //   protein: 0,
  //   fat: 0,
  //   carbs: 0,
  //   calories: 0,
  // };

  /*
  "SUGAR": {
    "label": "Sugars, total",
    "quantity": 0.042,
    "unit": "g"
  },
  */

  const nutritionFacts = {
    calories: 0,
    totalFat: {},
    satFat: {},
    transFat: {},
    cholestrol: {},
    sodium: {},
    carbs: {},
    fiber: {},
    sugar: {},
    protein: {},
    vitaminA: {},
    vitaminD: {},
    vitaminC: {},
    iron: {},
    potassium: {},
  };

  // {
  //   totalFat: {amount: 10, unit: 'g'}
  // }

  try {
    let apiSearch =
      'https://api.edamam.com/api/nutrition-data?app_id=ecfc207b&app_key=9b63181977059acf785ca3bd3b17cb36%20%09&nutrition-type=cooking&ingr=2%20cups%20spaghetti%2C%201%20cup%20tomatoes%2C%204%20cups%20parmesean%20cheese%2C%201%2F2%20cup%20peas';

    const result = await axios.get(apiSearch);
    let data = result.data;
    console.log(data);

    nutritionFacts.vitaminD.amount = data.totalNutrients.VITD.quantity;
    nutritionFacts.vitaminD.unit = data.totalNutrients.VITD.unit;

    console.log(nutritionFacts);
    return next();
  } catch {
    // console.log('error');
    return next({
      log: 'error in query',
    });
  }

  //async func to query the edamam API
  // PTG: Switch to nutrition api on edamam instead of meals
  // https://api.edamam.com/api/nutrition-data?app_id=ecfc207b&app_key=9b63181977059acf785ca3bd3b17cb36%20%09&nutrition-type=cooking&ingr=

  // async function queryApi() {
  //   for (let i = 0; i < req.body.ingredients.length; i++) {

  // loop through the data object
  // for (const item in data) {
  //   console.log(item);
  //   if (item === 'VITD') {
  //     console.log('found vitamin d');
  //     nutritionFacts.vitaminD.amount = item.quantity;
  //     nutritionFacts.vitaminD.unit = item.unit;
  // }
  // if (item === )
  // find all instances that match nutrition facts

  // if the subobject is "VITD"
  // make a new nutrient entry for vitamin D
  // save that into a variable, vitaminD

  // create new Meal entry
  // title and description
  // and then ppopulate nutrition facts property with all these ^^ variables

  // console.log(data.data.hints[0].food.nutrients.PROCNT);
  // nutrientObject.protein += data.data.hints[0].food.nutrients.PROCNT;
  // nutrientObject.fat += data.data.hints[0].food.nutrients.FAT;
  // nutrientObject.carbs += data.data.hints[0].food.nutrients.CHOCDF;
  // nutrientObject.calories += data.data.hints[0].food.nutrients.ENERC_KCAL;
  // });
  // }
  // return addToDatabase();
  // }

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
