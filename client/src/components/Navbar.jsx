import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className='h-[80px] flex items-center justify-center  border border-black'>
    <div className='flex w-full max-w-[1550px] items-center justify-between border border-green-500 lg:mx-5'>
      {/* image section */}
      <div className='flex h-[60px] w-[120px] items-center justify-center overflow-hidden border border-red-500'>
        <img src='/logo.png' alt='logo'/>
      </div>

      {/* nav links */}
      <ul className='flex items-center justify-center gap-4'>
        <li className='font-semibold'>
            <Link to='/'>Home</Link>
        </li>
        <li className='font-semibold'>
            <Link to='/about'>About</Link>
        </li>
        <li className='font-semibold rounded-xl bg-blue-500 px-5 py-2'>
            <Link to='/login'>Login</Link>
        </li>
        <li className='font-semibold rounded-xl bg-blue-500 px-5 py-2'>
             <Link to='/signup'>Signup</Link>
        </li>
        
      </ul>
    </div> 
    </header>
  )
};

export default Navbar;

