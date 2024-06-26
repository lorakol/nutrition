const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: [
    {
      ingredient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' },
      quantity: { type: Number, required: true },
    },
  ],
  instructions: [{ type: String, required: true }],
  cook_time: { type: Number, required: true },
  total_time: { type: Number, required: true },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
