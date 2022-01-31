const meal = require('../model')
const axios = require('axios');
const mealController = {}

//get
mealController.getMealsInfo = (req, res, next) =>{


    const {user_id} = req.body
        const mealsInfo =  `SELECT * FROM meal WHERE user_id = '${user_id}'`
        meal.query(mealsInfo)
        .then(data =>{
            if(data.rows) {
                res.locals.info = {
                    food: data.rows
                }   
            }
        })
    return next()
}

//adds meals 
mealController.addMeals = (req, res, next) =>{

    //ITERIATE THROUGH REQ.BODY.INGREDIENTS
        //SUM them into the 4 categories
        //SEND into SQL Database with (req.body.NAME, the 4 categories, the date, userID)
        
    let apiSearch = `https://api.edamam.com/api/food-database/v2/parser?app_id=f7bc40de&app_key=72cc5c040a857910e84239e6daad750c&ingr=${req.body.food}`
    let addFood = ''
    axios.get(apiSearch)
        .then (data => {
                if (data.data.hints[0]){ 
                   addFood = `INSERT INTO meal (user_id, date, protein, fat, carbs, calories, meal_name)
                   VALUES ('${req.body.user_id}, ${req.body.date}, ${data.data.hints[0].food.nutrients.PROCNT}, ${data.data.hints[i].food.nutrients.FAT}, ${data.data.hints[i].food.nutrients.CHOCDF}, ${data.data.hints[i].food.nutrients.ENERC_KCAL}, '${req.body.meal_name}')`
                }
            })


    if (addFoods !== '') {
        res.locals.info = {
            addedFood: true,
        }
        meal.query(addFood)
        return next()
    }
    else {
        res.locals.info = {
            addedFood: false,
        }
        return next()
    }

}

//front end will send us an array of food items
    //loop through the array of food items and do an api call for each of them and get the data for each, 
        //sum them
    //return the sum of the array of food items

module.exports = mealController;