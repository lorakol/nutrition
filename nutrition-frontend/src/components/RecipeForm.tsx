import React, { useState, useEffect } from 'react';
import { createRecipe, updateRecipe } from '../services/api';

interface RecipeFormProps {
  recipe?: any;
  onSuccess: () => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ recipe, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    cook_time: '',
    total_time: '',
  });

  useEffect(() => {
    if (recipe) {
      setFormData({
        name: recipe.name || '',
        ingredients: recipe.ingredients.map((ing: any) => `${ing.ingredient_id}:${ing.quantity}`).join(', ') || '',
        instructions: recipe.instructions.join('\n') || '',
        cook_time: recipe.cook_time || '',
        total_time: recipe.total_time || '',
      });
    }
  }, [recipe]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      ingredients: formData.ingredients.split(',').map(ing => {
        const [ingredient_id, quantity] = ing.split(':');
        return { ingredient_id: ingredient_id.trim(), quantity: parseFloat(quantity.trim()) };
      }),
      instructions: formData.instructions.split('\n').map(inst => inst.trim()),
    };

    try {
      if (recipe) {
        await updateRecipe(recipe._id, data);
      } else {
        await createRecipe(data);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} placeholder="Ingredients (ingredient_id:quantity, ...)" required />
      <textarea name="instructions" value={formData.instructions} onChange={handleChange} placeholder="Instructions (one per line)" required />
      <input name="cook_time" value={formData.cook_time} onChange={handleChange} placeholder="Cook Time" required />
      <input name="total_time" value={formData.total_time} onChange={handleChange} placeholder="Total Time" required />
      <button type="submit">{recipe ? 'Update' : 'Create'} Recipe</button>
    </form>
  );
};

export default RecipeForm;
