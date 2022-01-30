const meal = require('../model')

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
    const meals  = `SELECT * FROM meal` //WHERE user_id ==== ${id}, how do we access the user_id that is being selected?
    meal.query(meals)
    console.log(meals)
        .then(data =>  {
            for (let i = 0; i < data.rows.length; i++) {
            if(data.rows[i].user_id === req.body.user_id)
                
         })

}

//adds meals 
mealController.addMeals = (req, res, next) =>{
    
    //req.body.something is going to include the name of the food eaten
    //API CALL for the food eaten
        //parse out the cals, protein, fat, carbs
    //insert into DB the meal name, cals, protein, fat, carbs, and userID

}

module.exports = mealController;