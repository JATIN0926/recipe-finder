import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
} from "../../redux/favorites/favoritesSlice";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import "./RecipeCard.css";
import toast from "react-hot-toast";

// Placeholder image URL
const placeholderImage = "https://via.placeholder.com/400x300?text=No+Image";

const RecipeCard = ({ recipe }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);

  // Check if the recipe is already a favorite
  const isFavorite = favorites.some((fav) => fav.id === recipe.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      toast.success("Removed from Favourites");
      dispatch(removeFavorite(recipe));
    } else {
      toast.success("Added to Favourites");
      dispatch(addFavorite(recipe));
    }
  };

  return (
    <div className="max-w-xs w-full sm:w-[22rem] lg:w-[24rem] shadow-lg rounded-lg overflow-hidden transition-all group border border-gray-200 hover:shadow-xl relative flex flex-col bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      {/* Image section */}
      <div className="relative">
        <img
          className="h-48 w-full object-cover"
          src={recipe.image ? recipe.image : placeholderImage}
          alt={recipe.title}
        />
      </div>

      {/* Content section */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Recipe title with proper line clamping */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
          {recipe.title.length > 25
            ? recipe.title.substring(0, 25) + "..."
            : recipe.title}
        </h3>
      </div>

      {/* Footer section with star icon and "Read More" button */}
      <div className="flex justify-between items-center p-4 mt-auto">
        {/* Star icon for favorites */}
        <button onClick={toggleFavorite} className="text-2xl">
          {isFavorite ? (
            <AiFillStar className="text-yellow-500" />
          ) : (
            <AiOutlineStar className="text-gray-400 dark:text-gray-500" />
          )}
        </button>

        {/* Read More button */}
        <Link to={`/recipe/${recipe.id}`}>
          <button className="Read_more text-blue-500 dark:text-blue-400">
            <span> Read More</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
