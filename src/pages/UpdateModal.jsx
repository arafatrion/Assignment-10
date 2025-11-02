import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router"; 

export default function UpdateModal({ recipe, onClose, onUpdate }) {
    const [updatedRecipe, setUpdatedRecipe] = useState(recipe);
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedRecipe((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

   const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure missing fields are kept (optional)
    const fullUpdatedRecipe = {
        ...recipe,
        ...updatedRecipe
    };

    fetch(`http://localhost:5000/recipes/${recipe._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(fullUpdatedRecipe),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.modifiedCount > 0 || data.matchedCount > 0) {
                onUpdate(fullUpdatedRecipe);
                Swal.fire({
                    title: "Success!",
                    text: "Recipe updated successfully.",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then(() => {
                    onClose();
                    navigate('/my-recipes');
                });
            } else {
                Swal.fire("No Changes", "No fields were changed.", "info");
            }
        })
        .catch((err) => {
            console.error("Update failed", err);
            Swal.fire("Error", "Something went wrong", "error");
        });
};


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Update Recipe</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="text"
                        name="title"
                        value={updatedRecipe.title}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        placeholder="Title"
                        required
                    />
                    <textarea
                        name="ingredients"
                        value={updatedRecipe.ingredients}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        placeholder="Ingredients"
                        required
                    ></textarea>
                    <textarea
                        name="instructions"
                        value={updatedRecipe.instructions}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        placeholder="Instructions"
                        required
                    ></textarea>
                    <input
                        type="text"
                        name="cuisine"
                        value={updatedRecipe.cuisine}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        placeholder="Cuisine"
                    />
                    <input
                        type="number"
                        name="prepTime"
                        value={updatedRecipe.prepTime}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        placeholder="Preparation Time"
                    />

                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 px-4 py-1 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-1 rounded"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
