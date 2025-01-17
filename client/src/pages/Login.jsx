import axios from 'axios';
import React, { useState } from 'react';
import { setUserData } from '../Redux/slices/user-slice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState(""); // State for handling error message

  const loginUser = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      // Basic validation for empty fields
      if (!userEmail || !userPassword) {
        setError("Both email and password are required.");
        return;
      }

      const user = {
        userEmail,
        userPassword,
      };

      const result = await axios.post("http://localhost:5000/auth/login", user);
      console.log("User logged in successfully: ", result);

      // localStorage.setItem("authToken", result.data.token);

      dispatch(setUserData(result.data));
      console.log("User Data in Redux after dispatch: ", result.data);

      navigate("/"); // Redirect to home page
    } catch (error) {
      console.log("Cannot login the user: ", error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); // Show API-provided error message
      } else {
        setError("Invalid credentials or server error. Please try again.");
      }
    }
  };

  return (
    <div className='h-heightWithoutNavbar flex w-full items-center justify-center p-5'>
      <form className='flex w-full flex-col gap-4 max-w-[520px] bg-white p-5 shadow-xl' onSubmit={loginUser}>
        <h1 className='text-2xl font-bold'>Login</h1>

        {/* Error message display */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className='flex flex-col gap-4'>
          <div className="flex flex-col items-start justify-center">
            <label className='font-bold' htmlFor='userEmail'>Email</label>
            <input
              type="email"
              id='userEmail'
              name='userEmail'
              className='w-full rounded-lg border border-gray-400 p-2 focus:ring focus:ring-blue-500'
              placeholder='your.email@example.com'
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col items-start justify-center">
            <label className='font-bold' htmlFor='userPassword'>Password</label>
            <input
              type="password"
              id='userPassword'
              name='userPassword'
              className='w-full rounded-lg border border-gray-400 p-2 focus:ring focus:ring-blue-500'
              placeholder='*********'
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>
        </div>

        <button 
          type="submit" 
          className='rounded-lg text-white font-bold bg-blue-500 px-5 py-2 hover:bg-blue-600'
        >
          Submit
        </button>

        <div className="flex items-center justify-between text-sm">
          <p className="">New to FindMyNotes?</p>
          <Link to="/signup" className="font-bold">Create an account</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
