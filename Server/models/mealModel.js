const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: { type: String },
  amount: { type: Number },
  unit: { type: String },
});

const mealSchema = new Schema({
  name: { type: String },
  description: { type: String },
  type: { type: String },
  ingredients: [ingredientSchema],
  // PTG: add property for nutritional info
});

module.exports = mongoose.model('Meals', mealSchema);
