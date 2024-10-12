import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import Loader from "../components/Loader/Loader";
import NoResultFound from "../components/NoResultFound/NoResultFound";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1); // Current page or offset
  const [hasMore, setHasMore] = useState(true); // Flag to check if there are more recipes to load
  const [isFetchingMore, setIsFetchingMore] = useState(false); // To track loading of more data

  // Function to fetch recipes (popular vegetarian recipes or based on search term)
  const fetchRecipes = async (query = "", pageNumber = 1) => {
    try {
      const endpoint = `https://api.spoonacular.com/recipes/complexSearch`;
      const params = {
        apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
        number: 10,
        offset: (pageNumber - 1) * 10, // Pagination based on current page
        sort: query ? undefined : "popularity",
        diet: query ? undefined : "vegetarian",
      };

      if (query) {
        params.query = query;
      }

      const response = await axios.get(endpoint, { params });

      // Check if there are more recipes to load
      setHasMore(response.data.results.length > 0);

      // Update recipe list (concatenating new data with the previous)
      setRecipes((prevRecipes) => [...prevRecipes, ...response.data.results]);
      setLoading(false);
      setIsFetchingMore(false);
    } catch (error) {
      console.error("Error fetching recipes", error);
      setError("Failed to fetch recipes. Please try again later.");
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    // Fetch popular vegetarian recipes on mount or when the search term changes
    setRecipes([]); // Clear previous results when new search is made
    fetchRecipes(searchTerm, 1); // Always start at page 1 for a new search
    setPage(1); // Reset page number for new search
  }, [searchTerm]);

  // Infinite Scroll: Function to detect when user scrolls near the bottom
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
      document.documentElement.scrollHeight
    ) {
      if (hasMore && !isFetchingMore) {
        // Fetch more recipes only if there's more data and we are not already fetching
        setIsFetchingMore(true);
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  // Use effect to listen to scroll events for infinite scrolling
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
  }, [hasMore, isFetchingMore]);

  // Fetch more recipes when the page state is updated
  useEffect(() => {
    if (page > 1) {
      fetchRecipes(searchTerm, page);
    }
  }, [page]);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setRecipes([]); // Clear recipes on new search
    setPage(1); // Reset page number for a fresh search
    fetchRecipes(searchTerm, 1); // Fetch new search results starting from page 1
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center gap-6">
        <p className="text-center mt-6 text-lg">Loading recipes...</p>
        <Loader />
      </div>
    );

  if (error) return <p>{error}</p>;

  return (
    <div className="py-8 w-screen max-w-full">
      {/* Heading and Search Bar */}
      <div className="flex justify-between items-center px-6 mb-6">
        <h1 className="text-2xl font-semibold">Recipe Finder</h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="w-1/3">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 text-black rounded-lg"
            placeholder="Search for a recipe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>

      {/* Recipe Cards */}
      <div className="w-full flex items-center justify-center flex-wrap gap-[2rem]">
        {recipes.length > 0
          ? recipes.map((recipe) => (
              <div key={recipe.id} className="mx-4 my-4 self-start">
                <RecipeCard recipe={recipe} />
              </div>
            ))
          : !loading && <NoResultFound text="No Results found" />}
      </div>

      {/* Infinite Scroll Loader */}
      {isFetchingMore && (
        <div className="flex justify-center my-8">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Recipes;
