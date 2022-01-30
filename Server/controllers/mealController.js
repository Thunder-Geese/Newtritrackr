const meal = require('../model')

const mealController = {}

//get
mealController.getMealsInfo = (req, res, next) =>{
    //req.body send us the userid
    //pull from userid all rows //innerjoin user and meal where data is in last 7 days
        //response ill send
            // {
            //     {
            //         // 24 hors
            //     }
            //     {
            //         last 7 weeks
            //     }
            // }}
}

//adds meals 
mealController.addMeals = (req, res, next) =>{
    //post to basic thing 
    //API CALLS

}

module.exports = mealController;