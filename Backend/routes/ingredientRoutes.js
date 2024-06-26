const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredientController');

router.post('/', ingredientController.createIngredient);
router.get('/', ingredientController.getIngredient);
router.put('/:id', ingredientController.updateIngredient);
router.delete('/:id', ingredientController.deleteIngredient);
// Define other routes for update, delete, get

module.exports = router;
