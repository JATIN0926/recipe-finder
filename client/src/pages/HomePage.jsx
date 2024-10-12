import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/recipes");
  };

  return (
    <div className=" pt-16 flex flex-col items-center justify-center w-screen max-w-full">
      <div className="container mx-auto px-4 md:flex  mbMedium:items-center  mbMedium:justify-between">
        <div className=" w-full mbMedium:w-[75%] laptop:w-[60%] tbPortrait:w-1/2 mb-8 md:mb-0">
          <p className=" text-xl mbXSmall:text-2xl text-green-600 font-semibold uppercase mb-4">
            Welcome
          </p>
          <h1 className=" text-3xl mbXSmall:text-4xl mbSmall:text-5xl mbMedium:text-6xl tbPortrait:text-7xl font-bold  mb-8 leading-tight">
            Discover Delicious Recipes
          </h1>
          <p className=" text-lg mbXSmall:text-xl text-gray-600 mb-8 leading-relaxed">
            Whether you're cooking for a special occasion or just exploring new
            ideas in the kitchen, we offer a collection of easy and delightful
            recipes. Start your culinary journey with us and unlock the joy of cooking!
          </p>

          {/* Button */}
          <button
            onClick={handleNavigate}
            className="bg-green-600 text-white font-semibold py-4 px-6 rounded-full shadow-lg hover:bg-green-700 hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          >
            Explore Recipes
          </button>
        </div>

        {/* Image section */}
        <div className=" hidden laptop:block w-[40%] aspect-square flex justify-center">
          <img
            src="/images/hero.jpg" 
            alt="Delicious food"
            className="rounded-lg shadow-lg object-cover w-[500px] h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
