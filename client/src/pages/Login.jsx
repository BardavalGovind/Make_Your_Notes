import axios from 'axios';
import React, { useState } from 'react';
import { setUserData } from '../Redux/slices/user-slice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      if (!userEmail || !userPassword) {
        setError("Both email and password are required.");
        toast.error("Both email and password are required.");
        return;
      }

      const user = { userEmail, userPassword };

      const result = await axios.post("http://localhost:5000/auth/login", user);
      toast.success("Login successful!");

      dispatch(setUserData(result.data));

      navigate("/");
    } catch (error) {
      console.log("Cannot login the user: ", error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Invalid credentials or server error. Please try again.");
      }
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat px-5" 
         style={{ backgroundImage: "url('https://source.unsplash.com/random/1600x900/?nature,abstract')" }}>
      <form 
        className="flex w-full max-w-[500px] flex-col gap-5 bg-white bg-opacity-90 p-6 rounded-2xl shadow-2xl border border-gray-300 backdrop-blur-md"
        onSubmit={loginUser}
      >
        <h1 className="text-3xl font-extrabold text-gray-800 text-center">Login</h1>

        {/* Error message display */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="flex flex-col gap-5">
          {/* Email Input */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700" htmlFor="userEmail">Email</label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="your.email@example.com"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700" htmlFor="userPassword">Password</label>
            <input
              type="password"
              id="userPassword"
              name="userPassword"
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="*********"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="rounded-lg bg-blue-500 px-5 py-3 text-white font-semibold hover:bg-blue-600 transition duration-200 transform hover:scale-105 shadow-md"
        >
          Login
        </button>

        {/* Signup Redirect */}
        <div className="flex items-center justify-center text-sm text-gray-600">
          <p>New to FindMyNotes?</p>
          <Link to="/signup" className="ml-2 font-semibold text-blue-600 hover:underline">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;