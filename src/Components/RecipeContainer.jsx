import React, { useEffect, useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { Link } from 'react-router';
import Loding from '../pages/Loding';

const RecipeContainer = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const response = await fetch('https://recipe-book-server-topaz-three.vercel.app/recipes');
            const data = await response.json();
            setRecipes(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching recipes:', error);
            setLoading(false);
        }
    };

    const handleLike = async (recipeId, currentLikes) => {
        try {
            const response = await fetch(`https://recipe-book-server-topaz-three.vercel.app/recipes/${recipeId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ like: currentLikes + 1 })
            });

            if (response.ok) {
                setRecipes(recipes.map(recipe =>
                    recipe._id === recipeId
                        ? {
                            ...recipe,
                            isLiked: !recipe.isLiked, like: recipe.isLiked ? recipe.like - 1 : recipe.like + 1
                        }
                        : recipe
                ));
            }
        } catch (error) {
            console.log('Error updating likes:', error);
        }
    };

    if (loading) {
        return <div className="text-center text-xl py-10 text-gray-500"><Loding></Loding></div>;
    }

    // Decide how many recipes to show depending on showAll state
    const displayedRecipes = showAll ? recipes : recipes.slice(0, 6);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-center">All Recipes</h2>

            {recipes.length === 0 ? (
                <div className="text-center text-gray-500">
                    <p>No recipes found. Add some recipes to get started!</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {displayedRecipes.map((recipe) => (
                            <div
                                key={recipe._id}
                                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="relative">
                                    <img
                                        src={recipe.image}
                                        alt={recipe.title}
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/300x200?text=Recipe+Image';
                                        }}
                                    />

                                    <span className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                                        {recipe.type}
                                    </span>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-1">{recipe.title}</h3>
                                    <p className="text-sm text-gray-600 mb-4">By: {recipe.email}</p>
                                    <div className="flex items-center justify-between">
                                        <button
                                            className="flex items-center text-red-500 hover:text-red-600 transition-colors"
                                            onClick={() => handleLike(recipe._id, recipe.like)}
                                        >
                                            {recipe.isLiked ? (
                                                <FiHeart className="mr-1 text-red-500" />) : (
                                                <FiHeart className="mr-1" />
                                            )}

                                            {recipe.like || 0}
                                        </button>
                                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                                            {recipe.type}
                                        </span>
                                        <div className="text-center">
                                            <Link
                                                to={`/recipe-details/${recipe._id}`}

                                                className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {recipes.length > 6 && (
                        <div className="text-center mt-6">
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="px-4 py-2 w-full font-bold bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                            >
                                {showAll ? 'Show Less' : 'Show All'}
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default RecipeContainer;
