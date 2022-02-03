const request = require('supertest');
const server = 'http://localhost:3000';
const path = require('path');
// const assert = require('assert');
// const express = require('express');
// const app = express();
const app = require('../Server/server.js');

describe('Initial Test', () => {
  describe('/tests', () => {
    describe('POST', () => {
      const testEntry = {
        name: 'omelette',
        description: 'basic omelette, eggs only',
        type: '1 ingredient',
        ingredients: [{ name: 'eggs', amount: 2, unit: '4 ounce' }],
      };
      // add it to db

      const testDupe = { ...testEntry };

      it('returns a created meal', done => {
        request(app)
          .post('/tests')
          .send(testDupe)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            return done();
          });
      });
    });
  });
});
