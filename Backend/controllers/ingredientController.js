const Ingredient = require('../models/ingredient');
// Create a new ingredient
exports.createIngredient = async (req, res) => {
    try {
        const newIngredient = new Ingredient(req.body);
        await newIngredient.save();
        res.status(201).json(newIngredient);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
};
// Get all ingredients
exports.getIngredient = async (req, res) => {
    try {
        const ingredients = await Ingredient.find();
        res.status(200).json(ingredients);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};
// Update an ingredient
exports.updateIngredient = async (req, res) => {
    try {
        const updatedIngredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedIngredient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteIngredient = async (req, res) => {
    try {
        await Ingredient.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
