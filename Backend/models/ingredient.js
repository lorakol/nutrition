const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  protein_per_100g: { type: Number, required: true },
  fat_per_100g: { type: Number, required: true },
  salt_per_100g: { type: Number, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  allergens: [{ type: String }],
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;
