const user = require('../model')

const userController = {}

//verify user exists in database 
userController.verifyLogin = (req, res, next) =>{
    const userInfo = 'SELECT * FROM userinfo' //refactor: just grab the row where the DB username === req.body.username
    user.query(userInfo)
        .then(data => {
            for (let i = 0; i < data.rows.length; i++) {
                if ((data.rows[i].username === req.body.username) && (data.rows[i].password === req.body.password)) {
                    let userID = data.rows[i]._id
                    let age = data.rows[i].age
                    let weight = data.rows[i].weight
                    let height = data.rows[i].height
                    let sex = data.rows[i].sex
                    res.locals.info = {
                        validLogin: true,
                        userID: userID,
                        age: age,
                        weight: weight, 
                        height: height, 
                        sex: sex 
                    }
                    return next()
                }
            }
            res.locals.info = {
                validLogin: false,
            }
            return next()
        })



//create and save a new User into the database.
userController.createUser = (req, res, next) =>{
    const userInfo = 'SELECT * FROM userinfo'
    //query into db
    user.query(userInfo)
    .then(data => {
        for (let i=0; i<data.rows.length; i++) {
            //look to see if there is a db username === req.body.username  
            if (data.rows[i].username === req.body.username) {
                res.locals.info = {
                    validSignup: false
                }
                console.log("NO GOOD")
                return next()
            }
        }
    })
    const createUserQuery = 
    `INSERT INTO userinfo (username, password, age, weight, height, sex)
    VALUES ('${req.body.username}', '${req.body.password}', ${req.body.age}, ${req.body.weight}, ${req.body.height}, '${req.body.sex}')`
    user.query(createUserQuery)
        .then(data => {console.log(data)
            username = req.body.username;
            password = req.body.password;
            age = req.body.age;
            weight = req.body.weight
            height = req.body.height;
            sex = req.body.sex;
            res.locals.info = {
                validSignup: true,
                username: username,
                password: password,
                age: age,
                weight: weight,
                height: height,
                sex: sex
            }
            return next()
            })
}
}


module.exports = userController;