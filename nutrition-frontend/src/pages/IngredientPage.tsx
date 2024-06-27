import React, { useState, useEffect } from 'react';
import { getIngredients, deleteIngredient } from '../services/api';
import IngredientForm from '../components/IngredientForm';

const IngredientPage = () => {
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState<any | null>(null);

  const fetchIngredients = async () => {
    const response = await getIngredients();
    setIngredients(response.data);
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteIngredient(id);
    fetchIngredients();
  };

  const handleSuccess = () => {
    fetchIngredients();
    setSelectedIngredient(null);
  };

  return (
    <div>
      <IngredientForm ingredient={selectedIngredient} onSuccess={handleSuccess} />
      <ul>
        {ingredients.map(ingredient => (
          <li key={ingredient._id}>
            {ingredient.name}
            <button onClick={() => setSelectedIngredient(ingredient)}>Edit</button>
            <button onClick={() => handleDelete(ingredient._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientPage;
