import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UpdateModal from "./UpdateModal";

export default function MyRecipes({ userEmail }) {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetch(`https://recipe-book-server-topaz-three.vercel.app/recipes?email=${userEmail}`)
            .then(res => res.json())
            .then(data => setRecipes(data));
    }, [userEmail]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://recipe-book-server-topaz-three.vercel.app/recipes/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            setRecipes(prev => prev.filter(recipe => recipe._id !== id));
                            Swal.fire("Deleted!", "Your recipe has been deleted.", "success");
                        }
                    });
            }
        });
    };

    const handleUpdateClick = (recipe) => {
        setSelectedRecipe(recipe);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedRecipe(null);
    };

    const handleRecipeUpdate = (updatedRecipe) => {
        setRecipes(prev =>
            prev.map(r => (r._id === updatedRecipe._id ? updatedRecipe : r))
        );
    };

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {recipes.map(recipe => (
                <div key={recipe._id} className="bg-white shadow-lg rounded p-4">
                    <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover rounded" />
                    <h2 className="text-xl font-bold mt-2">{recipe.title}</h2>
                    <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                    <p><strong>Instructions:</strong> {recipe.instructions}</p>
                    <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
                    <p><strong>Prep Time:</strong> {recipe.prepTime} mins</p>
                    <p><strong>Category:</strong> {recipe.categories.join(", ")}</p>
                    <p><strong>Likes:</strong> {recipe.likeCount}</p>
                    <div className="mt-2 flex justify-between">
                        <button
                            onClick={() => handleUpdateClick(recipe)}
                            className="bg-yellow-400 px-3 py-1 rounded"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => handleDelete(recipe._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}

            {showModal && selectedRecipe && (
                <UpdateModal
                    recipe={selectedRecipe}
                    onClose={handleModalClose}
                    onUpdate={handleRecipeUpdate}
                />
            )}
        </div>
    );
}
