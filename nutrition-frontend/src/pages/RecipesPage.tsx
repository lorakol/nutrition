import React, { useState, useEffect } from 'react';
import { getRecipes, deleteRecipe } from '../services/api';
import RecipeForm from '../components/RecipeForm';

const RecipePage = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);

  const fetchRecipes = async () => {
    const response = await getRecipes();
    setRecipes(response.data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteRecipe(id);
    fetchRecipes();
  };

  const handleSuccess = () => {
    fetchRecipes();
    setSelectedRecipe(null);
  };

  return (
    <div>
      <RecipeForm recipe={selectedRecipe} onSuccess={handleSuccess} />
      <ul>
        {recipes.map(recipe => (
          <li key={recipe._id}>
            {recipe.name}
            <button onClick={() => setSelectedRecipe(recipe)}>Edit</button>
            <button onClick={() => handleDelete(recipe._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipePage;
