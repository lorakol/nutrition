import React, { useState, useEffect } from 'react';
import { createRecipe, updateRecipe } from '../services/api';
import { getIngredients} from '../services/api';
interface RecipeFormProps {
  recipe?: any;
  onSuccess: () => void;
}

const RecipeForm = ({ recipe , onSuccess } :RecipeFormProps ) => {
  const [formData, setFormData] = useState({
    name: '',
    ingredients: [],
    instructions: '',
    cook_time: '',
    total_time: '',
  });

  useEffect(() => {
    if (recipe) {
      setFormData({
        name: recipe.name || '',
        ingredients: recipe.ingredients || [],
        instructions: recipe.instructions.join('\n') || '',
        cook_time: recipe.cook_time || 0,
        total_time: recipe.total_time || 0,
      });
      //console.log(formData.ingredients);
      setIngredients(recipe.ingredients);
    }
  }, [recipe]);

  
  useEffect(() => {
    init();
    
  }, []);

  const init = async () => {
    const response = await getIngredients();
    setTotalIngredients(response.data);
    console.log(response.data)
  };




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
      ingredients: ingredients,
      instructions: formData.instructions.split('\n').map(inst => inst.trim()),
    };

    try {
      console.log(data)
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

  const [newIngredient, setNewIngredient] = useState({ ingredient_name: '',ingredient_id:'', quantity: 0 });
  const [Totalingredients, setTotalIngredients] = useState([]);
  const [ingredients, setIngredients] = useState(formData.ingredients);

  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'ingredient_name') {
      const selectedIngredient = Totalingredients.find(ingredient => ingredient._id === value);
      console.log(value);
      console.log(selectedIngredient);
      setNewIngredient({ ...newIngredient, ingredient_name: selectedIngredient.name,ingredient_id: selectedIngredient._id }); 
      console.log(newIngredient); 
    }
    else
      setNewIngredient({ ...newIngredient, [name]: value });
  };

  const handleAddIngredient = () => {
    console.log(newIngredient);
    
    setIngredients([...ingredients, { ...newIngredient }]);
    //setNewIngredient({ ingredient_name: '',ingredient_id:'', quantity: 0});
    setFormData({ ...formData, ingredients: ingredients});
  };

  const handleDeleteIngredient = (name: string) => {
    const updatedIngredients = ingredients.filter(ingredient => ingredient.ingredient_name !== name);
    setIngredients(updatedIngredients);
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const handleUpdateIngredient = (name: string, updatedIngredient : any) => {
    const updatedIngredients = ingredients.map(ingredient =>
      ingredient.ingredient_name === name ? updatedIngredient : ingredient
    );
    setIngredients(updatedIngredients);
    setFormData({ ...formData, ingredients: updatedIngredients});
  };

  return (

    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">{recipe ? 'Update Recipe' : 'Create Recipe'}</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>     

      <div className="mb-4">        
        <select
          id="newIngredientName"
          name="ingredient_name"
          // value={newIngredient.ingredient_name}
          onChange={handleIngredientChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 mb-2"
        >
          <option value="" disabled>Select Ingredient</option>
          {Totalingredients.map((ingredient: any, index) => (
            <option key={index} value={ingredient._id}>{ingredient.name}</option>
          ))}
        </select>
        <input
          id="newIngredientAmount"
          name="quantity"
          value={newIngredient.quantity}
          onChange={handleIngredientChange}
          type={'number'}
          placeholder="Ingredient quantity"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          type="button"
          onClick={handleAddIngredient}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-2"
        >
          Add Ingredient
        </button>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-4">Current Ingredients</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          
          <li key={index} className="mb-4 p-4 border border-gray-200 rounded-md shadow-sm">
            <div className="flex justify-between">
              <div className="flex">
                <p className="text-lg font-semibold">{ingredient.ingredient_name}:</p>
                <p className="text-lg text-gray-600">{ingredient.quantity}</p>
              </div>
              <div>                
                <button
                  onClick={() => handleDeleteIngredient(ingredient.ingredient_name)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          value={formData.instructions}
          onChange={handleInputChange}
          placeholder="Instructions (one per line)"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cook_time">Cook Time</label>
        <input
          id="cook_time"
          name="cook_time"
          value={formData.cook_time}
          onChange={handleInputChange}
          placeholder="Cook Time"
          type={'number'}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="total_time">Total Time</label>
        <input
          id="total_time"
          name="total_time"
          value={formData.total_time}
          onChange={handleInputChange}
          placeholder="Total Time"
          type={'number'}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
      >
        {recipe ? 'Update' : 'Create'} Recipe
      </button>
    </form>
    

  );
};

export default RecipeForm;
