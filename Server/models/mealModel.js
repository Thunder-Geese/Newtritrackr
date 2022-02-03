const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: { type: String },
  amount: { type: Number },
  unit: { type: String },
});

const nutrientSchema = new Schema({
  totalfat: String,
  cholesterol: String,
  sodium: String,
  totalcarbs: String,
  protein: String,
});

const mealSchema = new Schema({
  name: { type: String },
  description: { type: String },
  type: { type: String },
  ingredients: [ingredientSchema],
  // PTG: add property for nutritional info
  nutrient: nutrientSchema,
});

module.exports = mongoose.model('Meals', mealSchema);
