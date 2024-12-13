import React from 'react'

const Profile = () => {
  return (
    <div className='flex flex-col items-center justify-center
    border border-red-500 lg:h-heightWithoutNavbar lg:flex-row'>
      <div className='flex w-full flex-col items-center
      justify-center border-[3px] border-green-500 py-4 
      lg:h-full lg:w-[40%]'>
        <div className='grid h-[200px] w-[200px]
        place-content-center overflow-hidden rounded-full
         bg-gray-400 text-2xl font-black'>

            <img src='' alt='' className=''></img>
        </div>
        <div className=''>
            <div className=' my-2 flex flex-col items-center justify-center '>
                <h2 className='text-2xl font-black'>
                    <span>John</span> <span>Doe</span>
                </h2>
                <p className='mt-1 text-center'>johndoe123</p>
                <p className='mt-1 text-center'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et quod nisi voluptate 
                    perspiciatis quasi quas vel cupiditate impedit provident beatae!</p>
            </div>
        </div>

      </div>
      <div className=''></div>
    </div>
  )
}

export default Profile;
