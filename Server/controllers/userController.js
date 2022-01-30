const user = require('../model')

const userController = {}

//verify user exists in database 
userController.verifyLogin = (req, res, next) =>{

// const userInfo = `SELECT username, password FROM UserInfo WHERE username = ${req.body.username}`
//     user.query(userInfo)
//         .then(data => {if (data.username === request.username) && (data.password === request.password)}
//         res.local = "go ahead";
//         else {
//             res.local = incorrect login
//         }
//         )

//     //req.body
//         // req.body.username
//         // req.body.password
//     //get from DB
//         //username  {username: username, password: password}
//         //password
//   // promise chain to check data 
//     // OK -> meals page
//     // invalid login -> "incorrect login"
    
// }

let test = () => {
    const userInfo = 'SELECT username, password FROM userinfo'
    user.query(userInfo)
        .then(data => {console.log(data.rows)})

    }

    let test2 = () => {
        const userInfo = 'SELECT * FROM meal'
        user.query(userInfo)
            .then(data => {console.log(data.rows)})
    
        }

test()
test2()

}
//create and save a new User into the database.
userController.createUser = (req, res, next) =>{
    // post to DB 
}


module.exports = userController;