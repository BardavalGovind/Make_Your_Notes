import React from 'react';
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";


const Header = () => {
  return (
    <header className='h-[80px] flex items-center justify-cente'>
    <div className='mx-5 flex w-full max-w-[1550px] items-center justify-between'>
      {/* image section */}
      <div className='flex h-[60px] w-[120px] items-center justify-center overflow-hidden'>
        <img src='/logo.png' alt='logo'/>
      </div>

      <GiHamburgerMenu className='text-xl md:hidden'/>

      {/* nav links */}
     <div className='hidden md:flex md:items-center md:justify-center md:gap-4'>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {/* <Link to="/login">
          <button className='rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-blue-600'>Login</button>
        </Link>
        <Link to="/signup">
          <button className='rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-blue-600'>Signup</button>
        </Link>
     </div> */}

        <Link to="/search">
          <FaSearch className='text-xl'/>
        </Link>
        <Link to="/upload">
          <MdOutlineFileUpload className='text-{24px}'/>
        </Link>
        <Link to="/profile">
          <button className='rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-blue-600'>Profile</button>
        </Link>
        <Link to="/">
          <button className='rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-blue-600'>Logout</button>
        </Link>
     
    </div> 
    </div> 
    </header>
  );
};

export default Header;
