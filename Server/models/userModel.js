const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  meal_id: { type: Array }
});

module.exports = mongoose.Model('Users', userSchema);
