import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipesPage';
import IngredientPage from './pages/IngredientPage';
import AboutPage from './pages/AboutPage';

const App = () => {
    return (
        <div className="app min-h-screen bg-rose-50 text-gray-600 text-lg">
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path='/about' element={<AboutPage/>} />
            {/* <Route path='/sign_up' element={<Signup/>} /> */}
            <Route path='/ingredients' element={<IngredientPage/>} />
            <Route path='/recipes' element={<RecipePage/>} />
        </Routes>
        </div>
    );
};

export default App;
