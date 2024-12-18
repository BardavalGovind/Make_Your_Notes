import React from 'react';
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className='flex h-heightWithoutNavbar
    flex-col items-center justify-start p-4'>
      <div className='flex w-full items-center justify-center'>
        <form className='w-full rounded-xl border border-black max-w-[700px] bg-[#374151] p-4'>
            <div className='flex items-center justify-between'>
                {/* search logo */}
                <FaSearch className='text-2xl text-white'/>
                {/* input */}
                
                <input type='text' 
                placeholder='Search for Notes' 
                className='w-full ml-3 bg-[#374151]' 
                />
                <button type='submit'
                 className='bottom-2.5 end-2.5 rounded-lg bg-blue-700 px-4
                 py-2 text-sm font-medium text-white hover:bg-blue-800
                 focus:outline-none focus:ring-4 focus:ring-blue-300
                 dark:bg-blue-600 dark:hover:bg-blue-700
                 dark:focus:ring-blue-800'>
                    Search</button>
            </div>
        </form>
      </div>
      {/* documents */}
      <div className='mt-5
       w-full grid grid-cols-1 gap-5 border
        border-amber-500 sm:grid-cols-2 lg:grid-cols-4'>
        {/* <div className='flex w-[290px] items-center
        justify-between border border-black
         bg-[#374151] px-4 py-2 text-white'>
            <p className=''>
                <span className='font-bold'>File Name :</span>
                <span>{' '}Sem8</span>
            </p>
            <button className='rounded-xl bg-blue-500
             px-4 py-1 font-bold hover:bg-blue-600'>
                Show File
            </button>
        </div> */}
        { Array(8)
        .fill(true)
        .map((item, i)=>(
                <div
                 key={i}
                 className='flex w-[290px] items-center
                justify-between border rounded-lg border-black
                bg-[#374151] px-4 py-2 text-white'>
                    <p className=''>
                        <span className='font-bold'>File Name :</span>
                        <span>{' '}Sem8</span>
                    </p>
                    <button className='rounded-xl bg-blue-500
                    px-4 py-1 font-bold hover:bg-blue-600'>
                        Show File
                </button>
                </div>
        ))}
      </div>
    </div>
  );
};
export default SearchBar;







