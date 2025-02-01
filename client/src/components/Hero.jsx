import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Hero = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="relative flex h-screen items-center justify-center bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute w-[500px] h-[500px] bg-blue-400 opacity-20 rounded-full blur-3xl top-[-100px] left-[-100px] animate-pulse-fast"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-400 opacity-20 rounded-full blur-3xl bottom-[-150px] right-[-100px] animate-pulse-fast"></div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-[900px] text-center text-white px-6 md:px-12 py-12 sm:py-16 animate-fadeIn-fast">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 transition-transform duration-[250ms] ease-out hover:scale-125 hover:text-blue-200">
          Your Notes, <span className="text-blue-300">Organized & Accessible</span>
        </h1>

        <p className="text-lg md:text-xl font-light mb-10 max-w-[700px] mx-auto transition-transform duration-[400ms] ease-in delay-100 transform hover:scale-110 hover:translate-y-1 hover:text-blue-200">
          Stay in control of your ideas with a seamless, intuitive, and powerful note-taking experience.  
          Organize, edit, and access your notes anytime, anywhere!
        </p>

        <div className="flex justify-center gap-6">
          {isAuthenticated ? (
            <Link
              to="/search"
              className="px-8 py-3 rounded-xl text-lg font-semibold text-blue-800 bg-white hover:bg-blue-200 transition duration-[150ms] ease-in transform hover:scale-115 shadow-lg"
            >
              Get Started 
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-8 py-3 rounded-xl text-lg font-semibold text-white border-2 border-white hover:bg-blue-600 hover:border-blue-600 transition duration-[150ms] ease-in transform hover:scale-115 shadow-lg"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-8 py-3 rounded-xl text-lg font-semibold text-white border-2 border-white hover:bg-blue-300 hover:border-blue-600 transition duration-[150ms] ease-in transform hover:scale-115 shadow-lg"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
