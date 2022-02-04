const user = require('../models/userModel');
const bcrypt = require('bcrypt');

const userController = {};

//NEED TO ADD ERROR HANDLING

//verify user exists in database
userController.verifyLogin = (req, res, next) => {
  const { username, password } = req.body;

  //should use query parameters, not template literal
  //should also add bcrypt or other encryption

  // PTG: Mongo query to find user from username and check pw from req against pw in db, using bcrypt compare
  const userInfo = `SELECT * FROM userinfo WHERE username='${username}'`;
  user.query(userInfo).then(data => {
    console.log(data.rows[0]);
    //compare the req.body.password to the encrypted password
    if (data.rows[0].password === password) {
      let userID = data.rows[0]._id;
      let age = data.rows[0].age;
      let weight = data.rows[0].weight;
      let height = data.rows[0].height;
      let sex = data.rows[0].sex;

      // PTG: just send back validLogin: true + username
      res.locals.info = {
        validLogin: true,
        userID: userID,
        age: age,
        weight: weight,
        height: height,
        sex: sex,
      };

      return next();
    }
    res.locals.info = {
      validLogin: false,
    };
    return next();
  });
};

userController.checkUniqueUsername = (req, res, next) => {
  // PTG: SELECT from db to see if username already exist
  // PTG: Can simplify to just reading username, not all
  //query into db
  const { username } = req.body;
  user.findOne({ username: username }, (err, data) => {
    if (err) {
      return next({
        log: `Error occured in userController.checkUniqueUsername. ERROR: ${err}`,
        message: { err: 'Jackson already typed this and now I have to type it again SMH.' },
      });
    }
    if (data !== null) {
      res.locals.validSignup = false;
      return next();
    } else {
      res.locals.validSignup = true;
      return next();
    }
  });
};

userController.createUser = async (req, res, next) => {
  // PTG: simplify to just username and password
  const saltRounds = 10;
  const { username, password } = req.body;

  console.log(username, password);

  console.log(res.locals.validSignup);

  //PTG: NEED TO ADD ENCRYPTION
  if (!res.locals.validSignup) {
    return next();
  } else {
    try {
      const hash = await bcrypt.hash(password, saltRounds);
      // console.log(hash);

      // user.create({stuff}).then(result => res.locals = result.body.username)

      const result = await user.create({ username: username, password: hash, meal_ids: [] });
      // console.log(result);
      console.log(result.username);

      res.locals.username = result.username;
      return next();
    } catch (err) {
      return next({
        log: `Error in userController.createUser. ERROR: ${err}`,
        message: {
          err: 'Error in userController.createUser. See log for more deets.',
        },
      });
    }
  }
};

/*
  const userQuery = 'SELECT * FROM userinfo WHERE username = $1';
  user.query(userInfo).then(data => {
    //if the database returns a row of data, it found the username in the DB
    //so, the user already exists
    if (data.rows[0]) {
      res.locals.info = {
        //user already created
        validSignup: false,
      };
      return next();
    } else {
      //create a user here.
      // PTG: Rewrite to create user with MongoDB, send back validSignUp: True + username
      const createUserQuery = `INSERT INTO userinfo (username, password, age, weight, height, sex)
                VALUES ('${username}', '${password}', '${age}', '${weight}', '${height}', '${sex}')`;

      user.query(createUserQuery).then(data => {
        console.log(data);
        res.locals.info = {
          validSignup: true,
          username: username,
          password: password,
          age: age,
          weight: weight,
          height: height,
          sex: sex,
        };
        return next();
      });
    }
  });
  */
// };

userController.login = (req, res, next) => {
  const { username, password } = req.body;
  user.findOne({ username }).then(data => {
    bcrypt.compare(password, data.password, function (err, result) {
      if (!result) {
        return next('err'`, ${err}`);
      } else {
        next();
      }
    });
  });
};

module.exports = userController;
