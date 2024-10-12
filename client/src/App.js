import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import FavoriteRecipes from "./pages/FavouriteRecipes";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/favourites" element={<FavoriteRecipes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
