import { Link } from "react-router-dom";
import { deleteRecipe } from '../services/api';

const RecipeCard = ({ recipe }: any) => {
  return (
    <div className="recipe w-80 overflow-hidden bg-white/75 rounded-2xl shadow-xl p-5 shadow-rose-100 border-2 border-white flex flex-col gap-5">      
      <div className="texts">        
        <h2 className="title text-2xl font-semibold truncate">
          {recipe.name}
        </h2>
        <div className="flex gap-5">
          <Link
            to={`/recipe-item/${recipe._id}`}
            style={{ textAlign: "center"}}
            className="bg-gradient-to-br from-rose-400 to-rose-600 text-rose-50 p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-2 inline-block shadow-md shadow-rose-200 hover:shadow-lg hover:shadow-rose-300 duration-300"
          >
            View Recipe
          </Link>
          <Link
            to={`/`}
            onClick={() => deleteRecipe(recipe._id)}
            style={{ textAlign: "center"}}
            className="bg-gradient-to-br from-rose-400 to-rose-600 text-rose-50 p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-2 inline-block shadow-md shadow-rose-200 hover:shadow-lg hover:shadow-rose-300 duration-300"
          >
            Delete Recipe
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default RecipeCard;
