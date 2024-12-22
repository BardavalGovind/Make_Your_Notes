import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { removeUserData } from "../Redux/slices/user-slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(removeUserData());
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex h-[80px] items-center justify-center shadow-md">
      <div className="mx-5 flex w-full max-w-[1550px] items-center justify-between">
        {/* Logo Section */}
        <div className="flex h-[60px] w-[120px] items-center justify-center overflow-hidden">
          <img src="/logo.png" alt="Logo" />
        </div>

        {/* Hamburger Menu for Small Screens */}
        <GiHamburgerMenu
          className="text-xl md:hidden cursor-pointer"
          onClick={toggleMenu}
        />

        {/* Mobile Menu - Positioned on the Left Side */}
        {isMenuOpen && (
          <div className="fixed top-0 left-0 w-[250px] bg-gray-800 text-white z-50 p-5">
            <button
              className="text-white text-2xl absolute top-5 right-5"
              onClick={toggleMenu}
            >
              ✕
            </button>
            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                className="w-full hover:bg-blue-600 p-3 rounded transition duration-300"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="w-full hover:bg-blue-600 p-3 rounded transition duration-300"
              >
                About
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/search"
                    className="w-full hover:bg-blue-600 p-3 rounded transition duration-300"
                  >
                    Search
                  </Link>
                  <Link
                    to="/upload"
                    className="w-full hover:bg-blue-600 p-3 rounded transition duration-300"
                  >
                    Upload
                  </Link>
                  <Link to="/profile">
                    <button className="w-full px-5 py-2 font-semibold hover:bg-blue-700 transition duration-300">
                      Profile
                    </button>
                  </Link>
                  <button
                    className="w-full rounded-xl px-5 py-2 font-semibold hover:bg-blue-700 transition duration-300"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button className="w-full rounded-xl px-5 py-2 font-semibold hover:bg-blue-700 transition duration-300">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="w-full rounded-xl px-5 py-2 font-semibold hover:bg-blue-700 transition duration-300">
                      Signup
                    </button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}

        {/* Desktop Nav Links */}
        <div className="hidden md:flex md:items-center md:justify-center md:gap-4 text-center w-full">
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-500">
            About
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/search">
                <button className="rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-blue-700">
                  Search
                </button>
              </Link>
              <Link to="/upload">
                <button className="rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-blue-700">
                  Upload
                </button>
              </Link>
              <Link to="/profile">
                <button className="rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-blue-700">
                  Profile
                </button>
              </Link>
              <button
                className="rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-blue-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-blue-700">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-blue-700">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
