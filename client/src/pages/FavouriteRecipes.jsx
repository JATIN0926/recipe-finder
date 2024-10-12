// src/pages/Favorites.js
import React from "react";
import { useSelector } from "react-redux";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import NoResultFound from "../components/NoResultFound/NoResultFound";

const FavoriteRecipes = () => {
  const favorites = useSelector((state) => state.favorites.favorites);

  if (favorites.length === 0) {
    return <NoResultFound  text="No Favourite Recipes Yet !"/>;
  }

  return (
    <div className="py-8 w-screen max-w-full">
      <h1 className="text-2xl font-semibold mb-6 text-center">Your Favorites</h1>
      <div className="w-full flex items-center justify-center flex-wrap gap-[2rem]">
        {favorites.map((recipe) => (
          <div key={recipe.id} className="mx-4 my-4">
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteRecipes;
