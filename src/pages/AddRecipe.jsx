// import React from 'react';

// const AddRecipe = () => {
//     return (
//         <div>
//             <h1>this is an add recipe page </h1>
//         </div>
//     );
// };

// export default AddRecipe;




import { useState } from "react";
import Swal from "sweetalert2";

export default function AddRecipe() {
    const [recipe, setRecipe] = useState({
        image: "",
        title: "",
        ingredients: "",
        instructions: "",
        cuisine: "",
        prepTime: "",
        categories: [],
        likeCount: 0,
        email:""
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setRecipe((prev) => ({
                ...prev,
                categories: checked
                    ? [...prev.categories, value]
                    : prev.categories.filter((c) => c !== value),
            }));
        } else {
            setRecipe((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        
        fetch("http://localhost:5000/recipes", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipe)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "Great! Your recipe has been added successfully.",
                        icon: "success",
                       
                    });
                      setRecipe({
                        image: "",
                        email: "",
                        title: "",
                        ingredients: "",
                        instructions: "",
                        cuisine: "",
                        prepTime: "",
                        categories: [],
                        likeCount: 0,
                    });

                }
            })
                 .catch(err => {
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong. Please try again.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
                console.error(err);
            });
    };

    return (
        <div className="max-w-xl mx-auto bg-gray-100 shadow-xl rounded-2xl p-6 mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center"><span className="text-fuchsia-400">Add</span> Your Recipe</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Image Input */}
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={recipe.image}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                {/* Email */}
                <input
                    type="text"
                    name="email"
                    placeholder="Your Email"
                    value={recipe.email}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                {/* Title */}
                <input
                    type="text"
                    name="title"
                    placeholder="Recipe Title"
                    value={recipe.title}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                {/* Ingredients */}
                <textarea
                    name="ingredients"
                    placeholder="Ingredients (comma separated)"
                    value={recipe.ingredients}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                {/* Instructions */}
                <textarea
                    name="instructions"
                    placeholder="Instructions"
                    value={recipe.instructions}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                {/* Cuisine Type */}
                <select
                    name="cuisine"
                    value={recipe.cuisine}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                >
                    <option value="">Select Cuisine</option>
                    <option value="Italian">Italian</option>
                    <option value="Mexican">Mexican</option>
                    <option value="Indian">Indian</option>
                    <option value="Chinese">Chinese</option>
                </select>

                {/* Preparation Time */}
                <input
                    type="number"
                    name="prepTime"
                    placeholder="Preparation Time (minutes)"
                    value={recipe.prepTime}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                {/* Categories */}
                <div>
                    <label className="block text-fuchsia-400 font-semibold mb-1">Categories:</label>
                    {["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"].map((cat) => (
                        <label key={cat} className="mr-4">
                            <input
                                type="checkbox"
                                name="categories"
                                value={cat}
                                onChange={handleChange}
                                checked={recipe.categories.includes(cat)}
                                className="mr-1"
                            />
                            {cat}
                        </label>
                    ))}
                </div>

                {/* Like Count */}
                <div>
                    <label className="block font-semibold">Like Count:</label>
                    <p>{recipe.likeCount}</p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Add Recipe
                </button>
            </form>
        </div>
    );
}