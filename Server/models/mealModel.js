const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: {type: String},
  amount: {type: Number},
  unit: {type: String}
})

const mealSchema = new Schema({
  name: { type: String },
  description: { type: String },
  type: { type: String },
  ingredients: [ingredientSchema]
});

module.exports = mongoose.Model('Meals', mealSchema);
