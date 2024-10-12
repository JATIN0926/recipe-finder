import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaMoon, FaSun, FaBars } from "react-icons/fa";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { signoutSuccess } from "../../redux/user/UserSlice";
import axios from "axios";
import { toggleTheme } from "../../redux/theme/themeSlice";
import toast from "react-hot-toast";

const Header = () => {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const res = await axios.post("/api/auth/signout");
      if (res.statusText === "OK") {
        dispatch(signoutSuccess());
        toast.success("Signed out successfully");
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    dispatch(toggleTheme());
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Navbar className="border-b-2 bg-white dark:bg-gray-900 w-full z-50">
      <div className="flex items-center justify-between px-1 mbXSmall:px-10 w-full relative">
        {" "}
        {/* Added relative here */}
        <Link to="/" className="text-xl font-bold dark:text-white">
          Recipe Finder
        </Link>
        {/* Hamburger icon for mobile view */}
        <div className="md:hidden">
          <FaBars
            className="text-2xl dark:text-white cursor-pointer"
            onClick={handleMenuToggle}
          />
        </div>
        {/* Links Section */}
        <div className="hidden md:flex items-center space-x-10">
          <Link
            to="/"
            className={`text-base font-medium ${
              path === "/" ? "text-teal-500" : "text-gray-600 dark:text-white"
            } hover:text-teal-500 transition-all`}
          >
            Home
          </Link>
          <Link
            to="/favourites"
            className={`text-base font-medium ${
              path === "/favourites"
                ? "text-teal-500"
                : "text-gray-600 dark:text-white"
            } hover:text-teal-500 transition-all`}
          >
            Favourites
          </Link>

          {/* Theme Toggle */}
          <div
            className={`border-[2px] border-[#DADEE1] dark:border-[#343A40] bg-[#E9EAEC] dark:bg-[#222426] relative flex items-center w-[5rem] h-8 p-2 rounded-2xl cursor-pointer transition-colors duration-300`}
            onClick={() => {
              handleToggle();
            }}
          >
            {/* Circle */}
            <div
              className={`w-6 h-6 rounded-full  shadow-md transform transition-transform duration-300 dark:bg-[#888686] bg-white  ${
                isDarkMode ? "translate-x-0 " : "translate-x-10"
              }`}
            ></div>

            {/* Icon */}
            <div
              className={`absolute ${
                isDarkMode ? "right-2" : "left-2"
              } transition-all duration-300`}
            >
              <img
                src={isDarkMode ? "/icons/moon.svg" : "/icons/sun.svg"}
                alt={isDarkMode ? "Sun Icon" : "Moon Icon"}
                className="w-5 h-5"
              />
            </div>
          </div>

          {/* User Dropdown */}
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="user" img={currentUser.profilePicture} rounded />
              }
            >
              <Dropdown.Header>
                <span className="text-sm">@{currentUser.username}</span>
              </Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/sign-in">
              <Button gradientDuoTone="purpleToBlue" outline>
                Sign In
              </Button>
            </Link>
          )}
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden absolute top-[143%] left-0 w-full bg-white dark:bg-gray-900 z-50 flex flex-col items-center py-5 shadow-md space-y-4 transition-all duration-300 ease-in-out ${
              isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
            style={{ zIndex: 9999 }}
          >
            <Link
              to="/"
              className={`text-base font-medium ${
                path === "/" ? "text-teal-500" : "text-gray-600 dark:text-white"
              } hover:text-teal-500 transition-all`}
              onClick={handleMenuToggle}
            >
              Home
            </Link>
            <Link
              to="/favourites"
              className={`text-base font-medium ${
                path === "/favourites"
                  ? "text-teal-500"
                  : "text-gray-600 dark:text-white"
              } hover:text-teal-500 transition-all`}
              onClick={handleMenuToggle}
            >
              Favourites
            </Link>

            {/* Theme Toggle for mobile */}
            <div
              className={`border-[2px] border-[#DADEE1] dark:border-[#343A40] bg-[#E9EAEC] dark:bg-[#222426] relative flex items-center justify-start w-[5rem] h-8 p-2 rounded-2xl cursor-pointer transition-colors duration-300`}
              onClick={() => {
                handleToggle();
              }}
            >
              {/* Circle */}
              <div
                className={`w-6 h-6 rounded-full  shadow-md transform transition-transform duration-300 dark:bg-[#888686] bg-white  ${
                  isDarkMode ? "translate-x-0 " : "translate-x-10"
                }`}
              ></div>

              {/* Icon */}
              <div
                className={`absolute ${
                  isDarkMode ? "right-2" : "left-2"
                } transition-all duration-300`}
              >
                <img
                  src={isDarkMode ? "/icons/moon.svg" : "/icons/sun.svg"}
                  alt={isDarkMode ? "Sun Icon" : "Moon Icon"}
                  className="w-5 h-5"
                />
              </div>
            </div>

            {/* Sign In/Out Button for mobile */}
            {currentUser ? (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar alt="user" img={currentUser.profilePicture} rounded />
                }
              >
                <Dropdown.Header>
                  <span className="text-sm">@{currentUser.username}</span>
                </Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
              </Dropdown>
            ) : (
              <Link to="/sign-in">
                <Button gradientDuoTone="purpleToBlue" outline>
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </Navbar>
  );
};

export default Header;
