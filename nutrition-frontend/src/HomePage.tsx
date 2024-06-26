import React, { useState } from 'react';
import RecipePage from './pages/RecipesPage';
import IngredientPage from './pages/IngredientPage';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'recipes'>('ingredients');

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab('ingredients')}>Ingredients</button>
        <button onClick={() => setActiveTab('recipes')}>Recipes</button>
      </div>
      <div>
        {activeTab === 'ingredients' && <IngredientPage />}
        {activeTab === 'recipes' && <RecipePage />}
      </div>
    </div>
  );
};

export default HomePage;
