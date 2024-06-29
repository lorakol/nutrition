import React, { useState, useEffect } from 'react';
import { getRecipes, deleteRecipe } from '../services/api';
import RecipeForm from '../components/RecipeForm';
import { Link } from "react-router-dom";
import RecipeCard from './RecipeCard';
import { Button } from "@material-tailwind/react";

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

  const handleClickEdit = (e:any, recipe:any) => {    
      e.preventDefault();    
      setSelectedRecipe(recipe);
  };

  const handleClickDelete = (e:any, id:string) => {    
    e.preventDefault();    
    handleDelete(id);
};

  return (

    <div className="home container mx-auto py-10 flex flex-wrap gap-10 justify-center">
      <RecipeForm recipe={selectedRecipe} onSuccess={handleSuccess} />      
      {recipes?.length > 0 && 
        recipes.map((recipe) => 
        <div className="recipe w-80 overflow-hidden bg-white/75 rounded-2xl shadow-xl p-5 shadow-rose-100 border-2 border-white flex flex-col gap-5">      
          <div className="texts">        
            <h2 className="title text-2xl font-semibold truncate">
              {recipe.name}
            </h2>
            {/* <div className="flex gap-5"> */}
              <Link
                to={`/`}
                style={{ textAlign: "center"}}
                onClick={(e) => handleClickEdit(e, recipe)}
                className="bg-gradient-to-br from-rose-400 to-rose-600 text-rose-50 p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-2 inline-block shadow-md shadow-rose-200 hover:shadow-lg hover:shadow-rose-300 duration-300"
              >
                Update Recipe
              </Link>
              <Link
                to={`/`}
                onClick={(e) => handleClickDelete(e, recipe._id)}
                style={{ textAlign: "center"}}
                className="bg-gradient-to-br from-rose-400 to-rose-600 text-rose-50 p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-2 inline-block shadow-md shadow-rose-200 hover:shadow-lg hover:shadow-rose-300 duration-300"
              >
                Delete Recipe
              </Link>
            {/* </div> */}
            
          </div>
        </div>
        )}
    </div>
  );
};

export default RecipePage;
