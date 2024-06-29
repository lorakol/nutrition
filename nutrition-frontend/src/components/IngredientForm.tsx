import React, { useState, useEffect } from 'react';
import { createIngredient, updateIngredient } from '../services/api';

interface IngredientFormProps {
  ingredient?: any;
  onSuccess: () => void;
}

const IngredientForm = ({ ingredient, onSuccess }: IngredientFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    protein_per_100g: '',
    fat_per_100g: '',
    salt_per_100g: '',
    category: '',
    tags: '',
    allergens: '',
  });

  useEffect(() => {
    if (ingredient) {
      setFormData({
        name: ingredient.name || '',
        protein_per_100g: ingredient.protein_per_100g || '',
        fat_per_100g: ingredient.fat_per_100g || '',
        salt_per_100g: ingredient.salt_per_100g || '',
        category: ingredient.category || '',
        tags: ingredient.tags.join(', ') || '',
        allergens: ingredient.allergens.join(', ') || '',
      });
    }
  }, [ingredient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      allergens: formData.allergens.split(',').map(allergen => allergen.trim()),
    };

    try {
      if (ingredient) {
        await updateIngredient(ingredient._id, data);
      } else {
        await createIngredient(data);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving ingredient:', error);
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
    //   <input name="protein_per_100g" value={formData.protein_per_100g} onChange={handleChange} placeholder="Protein per 100g" required />
    //   <input name="fat_per_100g" value={formData.fat_per_100g} onChange={handleChange} placeholder="Fat per 100g" required />
    //   <input name="salt_per_100g" value={formData.salt_per_100g} onChange={handleChange} placeholder="Salt per 100g" required />
    //   <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
    //   <input name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma separated)" />
    //   <input name="allergens" value={formData.allergens} onChange={handleChange} placeholder="Allergens (comma separated)" />
    //   <button type="submit">{ingredient ? 'Update' : 'Create'} Ingredient</button>
    // </form>

<form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
<h2 className="text-2xl font-semibold mb-6">{ingredient ? 'Update Ingredient' : 'Create Ingredient'}</h2>

<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
  <input
    id="name"
    name="name"
    value={formData.name}
    onChange={handleChange}
    placeholder="Name"
    required
    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
  />
</div>

<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="protein_per_100g">Protein per 100g</label>
  <input
    id="protein_per_100g"
    name="protein_per_100g"
    value={formData.protein_per_100g}
    onChange={handleChange}
    placeholder="Protein per 100g"
    type={'number'}
    required
    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
  />
</div>

<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fat_per_100g">Fat per 100g</label>
  <input
    id="fat_per_100g"
    name="fat_per_100g"
    value={formData.fat_per_100g}
    onChange={handleChange}
    placeholder="Fat per 100g"
    type={'number'}
    required
    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
  />
</div>

<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salt_per_100g">Salt per 100g</label>
  <input
    id="salt_per_100g"
    name="salt_per_100g"
    value={formData.salt_per_100g}
    onChange={handleChange}
    placeholder="Salt per 100g"
    type={'number'}
    required
    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
  />
</div>

<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Category</label>
  <input
    id="category"
    name="category"
    value={formData.category}
    onChange={handleChange}
    placeholder="Category"
    required
    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
  />
</div>

<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">Tags</label>
  <input
    id="tags"
    name="tags"
    value={formData.tags}
    onChange={handleChange}
    placeholder="Tags (comma separated)"
    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
  />
</div>

<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="allergens">Allergens</label>
  <input
    id="allergens"
    name="allergens"
    value={formData.allergens}
    onChange={handleChange}
    placeholder="Allergens (comma separated)"
    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
  />
</div>

<button
  type="submit"
  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
>
  {ingredient ? 'Update' : 'Create'} Ingredient
</button>
</form>
  );
};

export default IngredientForm;
