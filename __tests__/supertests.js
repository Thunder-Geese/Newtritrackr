const request = require('supertest');
const server = 'http://localhost:3000';
const path = require('path');
const assert = require('assert');
// const express = require('express');
// const app = express();
const app = require('../Server/server.js');
const dbConnection = require('../Server/dbConnection.js');
const User = require('../Server/models/userModel.js');
const { accessSync } = require('fs');

const testEntry = {
  username: 'alexizdabest',
  mealInfo: {
    name: 'bombbrekky',
    description: 'sick omelette with hella veg',
    type: 'breakfast',
    ingredients: [
      { name: 'eggs', amount: 2, unit: '4 ounce' },
      { name: 'veg', amount: 1, unit: 'hella' },
    ],
  },
};

beforeAll(async () => {
  console.log('in before all');
  await dbConnection();
  console.log('after connection before all');
  // console.log(connection);
});

describe('post route to add meal', () => {
  it('should add a meal into db', async () => {
    console.log('in should add a meal');
    const res = await request(app).post('/tests').send(testEntry);
    console.log('RES', res);
    console.log(res.body);
    console.log('after going through route in add meal');
    expect(res.statusCode).toEqual(200);
    expect(res.header['content-type']).toEqual('application/json; charset=utf-8');
    // expect(res.body).toEqual(testEntry);
    expect(res.body.name).toEqual(testEntry.mealInfo.name);
    expect(res.body.description).toEqual(testEntry.mealInfo.description);
    expect(res.body.type).toEqual(testEntry.mealInfo.type);
    // expect(res.body.ingredients).toEqual(testEntry.mealInfo.ingredients);

    testEntry.mealInfo.ingredients.forEach((ingredient, idx) => {
      expect(ingredient.name).toEqual(res.body.ingredients[idx].name);
      expect(ingredient.amount).toEqual(res.body.ingredients[idx].amount);
      expect(ingredient.unit).toEqual(res.body.ingredients[idx].unit);
    });
    //it should add meal ids to meal_ids array for user
  });
});

describe('Route to /users', () => {
  describe('POST to /signup', () => {
    const fakeUser = {
      username: 'jacksonizliterallyDABEST',
      password: 'lookatmycleverpassword',
    };

    const duplicateUsername = {
      username: 'jacksonizliterallyDABEST',
      password: 'thisisanotheruserwiththesameusername',
    };
    let res;

    beforeEach(async () => {
      res = await request(app).post('/users/signup').send(fakeUser);
    });

    it('should add new user to database', async () => {
      const query = await User.findOne({ username: fakeUser.username });
      expect(query).not.toEqual(null);
    });

    it('should respond correctly to client on unsuccesful signup', async () => {
      // const res = await request(app).post('/users/signup').send(fakeUser);
      expect(res.statusCode).toEqual(400);
      expect(res.body.validSignup).toEqual(false);
    });

    it('should respond correctly to client on successful signup', async () => {
      // const res = await request(app).post('/users/signup').send(fakeUser);
      expect(res.statusCode).toEqual(200);
      expect(res.body.validSignup).toEqual(true);
      expect(res.body.username).toEqual(fakeUser.username);
    });
  });

  // describe('GET to /');
});

/*
describe('Initial Test', () => {
  describe('/tests', () => {
    describe('POST', () => {
      const testEntry = {
        name: 'omelette',
        description: 'basic omelette, eggs only',
        type: 'breakfast',
        ingredients: [
          { name: 'eggs', amount: 2, unit: '4 ounce' },
          { name: 'salt', amount: 1, unit: 'pinch' },
        ],
      };
      // add it to db

      const testDupe = { ...testEntry };

      /*
       .then(response => {
          assert(response.body.email, 'foo@bar.com')
          done();
      })
      .catch(err => done(err))
  });
});
*/

/*
You can also use promises:

describe('GET /users', function() {
  it('responds with json', function(done) {
    return request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
          assert(response.body.email, 'foo@bar.com')
          done();
      })
      .catch(err => done(err))
  });
});
*/

/*
var request = require('supertest');
var app = require('../app.js');
var assert = require("assert")

describe('GET /api/customers', function () {
    it('responds with customers', function (done) {
        request(app).get('/' +
            'api/customers')
            .expect('Content-Type', /json/)
            .expect(function (res) {
                assert.equal(res.body[0].name,'visionmedia');
            })
            .end(done)
    });
});


      // console.log(testEntry);

      it('returns a created meal', function (done) {
        request(app)
          .post('/tests')
          .send(testEntry)
          .expect(200)
          .expect(function (res) {
            console.log(res);
            console.log(res.body);
            assert.equal('name', 'omelette');
            assert.equal('description', 'basic omelette, eggs only');
            assert.equal('type', 'breakfast');
            assert.equal('ingredients', [
              { name: 'eggs', amount: 2, unit: '4 ounce' },
              { name: 'salt', amount: 1, unit: 'pinch' },
            ]);
          })
          .end(done())
          .catch(err => done(err));
      });
      // .end((err, res) => {
      //   if (err) return done(err);
      //   return done();
      // });
    });
  });
});
*/
