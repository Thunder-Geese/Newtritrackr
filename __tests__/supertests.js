const request = require('supertest');
const server = 'http://localhost:3000';
const path = require('path');
const assert = require('assert');
// const express = require('express');
// const app = express();
const app = require('../Server/server.js');

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
*/

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
