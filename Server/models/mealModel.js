const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: { type: String },
  amount: { type: Number },
  unit: { type: String },
});

const nutrientSchema = new Schema({
  amount: { type: Number },
  unit: { type: String },
});

const nutritionFactsSchema = new Schema({
  calories: { type: Number },
  totalFat: nutrientSchema,
  satFat: nutrientSchema,
  transFat: nutrientSchema,
  cholestrol: nutrientSchema,
  sodium: nutrientSchema,
  carbs: nutrientSchema,
  fiber: nutrientSchema,
  sugar: nutrientSchema,
  protein: nutrientSchema,
  vitaminA: nutrientSchema,
  vitaminD: nutrientSchema,
  vitaminC: nutrientSchema,
  iron: nutrientSchema,
  potassium: nutrientSchema,
});

const mealSchema = new Schema({
  name: { type: String },
  description: { type: String },
  type: { type: String },
  ingredients: [ingredientSchema],
  // PTG: add property for nutritional info
  nutrient: nutritionFactsSchema,
});

module.exports = mongoose.model('Meals', mealSchema);
