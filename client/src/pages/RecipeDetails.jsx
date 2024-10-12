import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import NoResultFound from "../components/NoResultFound/NoResultFound";
const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recipe details from the API
  const fetchRecipeDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information`,
        {
          params: {
            apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
          },
        }
      );
      setRecipe(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch recipe details.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, [id]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center gap-6">
        <p className="text-center mt-6">Loading recipe details...</p>
        <Loader />
      </div>
    );

  if (error) return (
    <NoResultFound text="Failed To Load Recipe Details!" />
  );

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 min-h-screen">
      {/* Recipe Image and Title */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Image Section */}
        <img
          src={recipe?.image || "/placeholder-image.png"} // Fallback image
          alt={recipe?.title || "Recipe Image"}
          className="w-full md:w-1/2 h-auto rounded-lg shadow-lg object-cover"
        />
        <div className="flex flex-col justify-start items-start gap-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            {recipe?.title || "Recipe Title"}
          </h1>
          <p className="text-md md:text-lg text-gray-600 dark:text-gray-300">
            {recipe?.summary
              ? recipe.summary.replace(/<[^>]+>/g, "")
              : "No summary available for this recipe."}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-semibold">Servings:</span>{" "}
            {recipe?.servings || "N/A"}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-semibold">Ready in:</span>{" "}
            {recipe?.readyInMinutes
              ? `${recipe.readyInMinutes} minutes`
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Ingredients and Instructions */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Ingredients List */}
        <div>
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">
            Ingredients
          </h2>
          {recipe?.extendedIngredients?.length > 0 ? (
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              {recipe.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Ingredients data is not available.</p>
          )}
        </div>

        {/* Cooking Instructions */}
        <div>
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">
            Instructions
          </h2>
          {recipe?.analyzedInstructions?.[0]?.steps?.length > 0 ? (
            <ol className="list-decimal pl-6 text-gray-700 dark:text-gray-300 space-y-3">
              {recipe.analyzedInstructions[0].steps.map((step) => (
                <li key={step.number}>{step.step}</li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-500">
              No cooking instructions available for this recipe.
            </p>
          )}
        </div>
      </div>

      {/* Source Link */}
      {recipe?.sourceUrl && (
        <div className="mt-12">
          <a
            href={recipe.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 hover:text-teal-800 font-semibold text-lg underline"
          >
            View full recipe on {recipe.sourceName || "source"}
          </a>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
