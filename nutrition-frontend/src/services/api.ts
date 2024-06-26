import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api', // Adjust this to your backend's base URL
});

export const getIngredients = () => api.get('/ingredients');
export const createIngredient = (data: any) => api.post('/ingredients', data);
export const updateIngredient = (id: string, data: any) => api.put(`/ingredients/${id}`, data);
export const deleteIngredient = (id: string) => api.delete(`/ingredients/${id}`);

export const getRecipes = () => api.get('/recipes');
export const createRecipe = (data: any) => api.post('/recipes', data);
export const updateRecipe = (id: string, data: any) => api.put(`/recipes/${id}`, data);
export const deleteRecipe = (id: string) => api.delete(`/recipes/${id}`);
