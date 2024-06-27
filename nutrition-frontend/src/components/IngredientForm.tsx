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
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input name="protein_per_100g" value={formData.protein_per_100g} onChange={handleChange} placeholder="Protein per 100g" required />
      <input name="fat_per_100g" value={formData.fat_per_100g} onChange={handleChange} placeholder="Fat per 100g" required />
      <input name="salt_per_100g" value={formData.salt_per_100g} onChange={handleChange} placeholder="Salt per 100g" required />
      <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
      <input name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma separated)" />
      <input name="allergens" value={formData.allergens} onChange={handleChange} placeholder="Allergens (comma separated)" />
      <button type="submit">{ingredient ? 'Update' : 'Create'} Ingredient</button>
    </form>
  );
};

export default IngredientForm;
