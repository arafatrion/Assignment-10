import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/recipes/${id}`)
      .then(res => res.json())
      .then(data => {
        setRecipe(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching recipe details:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!recipe) return <div className="text-center py-10">Recipe not found</div>;

  return (
    <div className="max-w-3xl bg-gray-300 border-b-blue-300 rounded-2xl mx-auto px-4 py-8">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-lg mb-6 shadow-md"
      />
      <h2 className="text-3xl font-bold mb-3">{recipe.title}</h2>
       
      <p className="text-gray-700 mb-3"><strong>By:</strong> {recipe.email}</p>
      <p className="text-gray-700 mb-3"><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p className="text-gray-700 mb-3"><strong>Instructions:</strong> {recipe.instructions}</p>
      <p className="text-gray-700 mb-3"><strong>Preparation Time:</strong> {recipe.prepTime} mins</p>
      
      <Link
        to="/"
        className="inline-block mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default RecipeDetails;