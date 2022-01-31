const user = require('../model')

const userController = {}

//verify user exists in database 
userController.verifyLogin = (req, res, next) =>{
    const { username, password } = req.body;

    //should use query parameters, not template literal
    //should also add bcrypt or other encryption
    const userInfo = `SELECT * FROM userinfo WHERE username='${username}'` 
    user.query(userInfo)
        .then(data => {
                //compare the req.body.password to the encrypted password
                if (data.rows[0].password === password) {
                    let userID = data.rows[0]._id
                    let age = data.rows[0].age
                    let weight = data.rows[0].weight
                    let height = data.rows[0].height
                    let sex = data.rows[0].sex
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
            res.locals.info = {
                validLogin: false,
            }
            return next()
        })
}

// username: test
// pword: testpw

//create and save a new User into the database.
userController.createUser = (req, res, next) =>{

    const { username, password, age, weight, height, sex } = req.body;

    const userInfo = `SELECT * FROM userinfo WHERE username = '${username}'`
    //query into db
    user.query(userInfo)
    .then(data => {
            //if the database returns a row of data, it found the username in the DB
            //so, the user already exists
            if (data.rows[0]){
                res.locals.info = {
                    validSignup: false
                }
                return next()
            } else {
                //create a user here.
                const createUserQuery = 
                `INSERT INTO userinfo (username, password, age, weight, height, sex)
                VALUES ('${username}', '${password}', '${age}', '${weight}', '${height}', '${sex}')`;

                user.query(createUserQuery)
                    .then(data =>{console.log(data)
                        res.locals.info = {
                            validSignup: true,
                            username: username,
                            password: password,
                            age: age,
                            weight: weight,
                            height: height, 
                            sex: sex
                        }
                        return next ();
                    });
            }
    })   
 }




module.exports = userController;