const meal = require('../model')
const axios = require('axios');
const mealController = {}

//get
mealController.getMealsInfo = (req, res, next) =>{
    // select everything from  meal table all meals where user__id === req.body.__userID
    // query that data
        // iterating through the data 
        // split into 2 objs 
            // one for meals within 24 hours // 
            // one for 7 days 

    // const id = req.body.id or req.query.id 
//     const meals  = `SELECT * FROM meal` //WHERE user_id ==== ${id}, how do we access the user_id that is being selected?
//     meal.query(meals)
//     console.log(meals)
//         .then(data =>  {
//             for (let i = 0; i < data.rows.length; i++) {
//             if(data.rows[i].user_id === req.body.user_id && data.rows[i].)
//                 let 
//          })

}

//adds meals 
mealController.addMeals = (req, res, next) =>{

    const apiSearch = `https://api.edamam.com/api/food-database/v2/parser?app_id=f7bc40de&app_key=72cc5c040a857910e84239e6daad750c&ingr=${req.body.food}`
    // let addFood = ''
    // axios.get(apiSearch)
    //     .then (data => {
    //          for (let i = 0; i < data.data.hints[i]; i++) {
    //             if (req.body.food == data.data.hints[i].food.label){ 
    //                addFood = `INSERT INTO meal (user_id, date, protein, fat, carbs, calories, meal_name)
    //                VALUES ('${req.body.user_id}, ${req.body.date}, ${data.data.hints[i].food.nutrients.PROCNT}, ${data.data.hints[i].food.nutrients.FAT}, ${data.data.hints[i].food.nutrients.CHOCDF}, ${data.data.hints[i].food.nutrients.ENERC_KCAL}, '${req.body.meal_name}')`
    //             }
    //         }
    //     })
    // if (addFoods !== '') {
    //     meal.query(addFood)
    //     return next()
    // }
    // else {
    //     //send something if we cant find food name?
    //     return next()
    // }

    axios.get(apiSearch)
        //it pulls food labels that contains what we are passing in through "req.body.food"
        .then(data => console.log('HERE', data.data.hints[0]))

}

module.exports = mealController;