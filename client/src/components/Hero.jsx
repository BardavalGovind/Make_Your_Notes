import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='bg-unsplashBgImage relative flex h-full 
    items-center justify-center bg-cover bg-center'>
      <div className='absolute inset-0 bg-black bg-opacity-70'/>
      <div className='relative z-10 w-full max-w-[860px] border text-center text-white'>
        <h1 className='text-4xl font-black md:text-5xl'>FIND MY NOTES</h1>
        <p className='mt-5 text-sm font-light md:text-xl md:font-normal'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
          Eius illum perferendis beatae, minima aperiam vitae quos nam sint pariatur voluptate fugit sunt quibusdam
          unde eos porro rem consectetur delectus deserunt libero aliquam magni sequi commodi magnam!
          Necessitatibus, ex et a aliquid doloremque exercitationem perspiciatis dolorem modi eos incidunt nulla beatae mollitia earum. Enim velit, quod ullam explicabo vitae totam a. Qui minus recusandae aliquid quas ea sequi sed explicabo inventore dolorum, reiciendis natus laboriosam nisi, mollitia soluta nemo unde fugiat deleniti accusamus iure enim iusto ab? Asperiores, dolorem expedita
          cumque facere similique molestiae, laboriosam
        </p>
        <div className='mt-5'>
          {/* <Link to="/search">
              <button className='rounded-xl bg-white 
              px-7 py-4 font-black text-blue-500'>
                Get Started</button>
          </Link> */}
          <div className='flex items-center justify-center gap-5'>
          <Link to="/login">
              <button className='rounded-xl bg-white 
              px-7 py-4 font-black text-blue-500'>
                Login</button>
          </Link>
          <Link to="/signup">
              <button className='rounded-xl bg-white 
              px-7 py-4 font-black text-blue-500'>
                SignUp</button>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Hero;



