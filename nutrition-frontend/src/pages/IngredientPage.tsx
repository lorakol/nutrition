import React, { useState, useEffect } from 'react';
import { getIngredients, deleteIngredient } from '../services/api';
import IngredientForm from '../components/IngredientForm';
import { Link } from "react-router-dom";

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

  const handleClickEdit = (e:any, ingredient:any) => {    
    e.preventDefault();    
    setSelectedIngredient(ingredient);
};

const handleClickDelete = (e:any, id:string) => {    
  e.preventDefault();    
  handleDelete(id);
};

  return (

    <div className="home container mx-auto py-10 flex flex-wrap gap-10 justify-center">
      <IngredientForm ingredient={selectedIngredient} onSuccess={handleSuccess} />      
      {ingredients?.length > 0 && 
        ingredients.map((ingredient) => 
        <div className="recipe w-80 overflow-hidden bg-white/75 rounded-2xl shadow-xl p-5 shadow-rose-100 border-2 border-white flex flex-col gap-5">      
          <div className="texts">        
            <h2 className="title text-2xl font-semibold truncate">
              {ingredient.name}
            </h2>
            {/* <div className="flex gap-5"> */}
              <Link
                to={`/`}
                style={{ textAlign: "center"}}
                onClick={(e) => handleClickEdit(e, ingredient)}
                className="bg-gradient-to-br from-rose-400 to-rose-600 text-rose-50 p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-2 inline-block shadow-md shadow-rose-200 hover:shadow-lg hover:shadow-rose-300 duration-300"
              >
                Update Ingredient
              </Link>
              <Link
                to={`/`}
                onClick={(e) => handleClickDelete(e, ingredient._id)}
                style={{ textAlign: "center"}}
                className="bg-gradient-to-br from-rose-400 to-rose-600 text-rose-50 p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-2 inline-block shadow-md shadow-rose-200 hover:shadow-lg hover:shadow-rose-300 duration-300"
              >
                Delete Ingredient
              </Link>
            {/* </div> */}
            
          </div>
        </div>
        )}
    </div>

    
  );
};

export default IngredientPage;
