import React from 'react'
import { Link } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';
import DarkModeButton from '../components/DarkModeButton';
import { HiOutlineCode } from 'react-icons/hi';

function Homepage() {

  const [colorTheme, setTheme] = useDarkMode();

  return (
    <div>
      <div className='hidden md:contents'>
        <div className='bg-gray-200 dark:bg-zinc-900 h-screen no-scrollbar overflow-scroll'>
          <div className='flex flex-row  bg-gray-300 dark:bg-zinc-800 p-4 justify-between h-[7vh] px-6'>
            <p className=' flex md:text-2xl text-xl text-zinc-400'>CodeSync<HiOutlineCode className='mx-2 my-[6px]' /></p>
            <div className='flex'>
              <Link to='/room' className='flex justify-center'><button className='btn btn-primary border-2 mx-2'>Rooms</button></Link>
              {/* <DarkModeButton /> */}
            </div>
          </div>
          <div className='m-4 p-6'>
            {/* <p className='flex justify-center p-3 md:text-6xl text-5xl text-zinc-400'>CodeSync<HiOutlineCode className='m-2' /></p> */}
          </div>
          <div className='grid place-content-center pt-8 w-auto flex-shrink'>
            <div className='flex'>
              {/* <img src='./Images/team.svg' alt='team' className='m-4 h-[45.4vh] w-[55vh]' /> */}
              <div className='flex flex-col justify-center h-auto items-center shrink'>
                <p className='text-3xl break-words text-zinc-500 mb-8 px-[4vh]'>An online IDE to edit, compile and run code.</p>
                {/* <p className='flex justify-center md:text-4xl text-[25px] break-words text-zinc-500 m-2'>Haven't used CodeSync yet?</p> */}
                {/* <p className='flex justify-center md:text-2xl text-xl text-zinc-500 mt-2 mb-8'>Create your first room now.</p> */}
              </div>
            </div>
          </div>
          <div className='flex justify-center h-[160vh] md:h-auto bg-gray-200 dark:bg-zinc-900 p-[4vh] lg:p-[10vh] md:mt-[2vh] md:mb-[22vh] lg:mb-[10vh]'>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-1 h-[60vh] md:w-[70vh] lg:w-[120vh] justify-items-center '>
              <div className='h-[21vh] w-[32vh] my-4 bg-gray-300 dark:bg-zinc-800 rounded-xl p-3'>
                <img src='./Images/c.svg' alt='python' className='h-[18vh] w-full' />
              </div>
              <div className='h-[21vh] w-[32vh] my-4 bg-gray-300 dark:bg-zinc-800 rounded-xl p-3'>
                <img src='./Images/java.svg' alt='python' className='h-[18vh] w-full' />
              </div>
              <div className='h-[21vh] w-[32vh] my-4 bg-gray-300 dark:bg-zinc-800 rounded-xl p-3'>
                <img src='./Images/python.svg' alt='python' className='h-[18vh] w-full mx-[7vh]' />
              </div>
              <div className='h-[21vh] w-[32vh] my-4 bg-gray-300 dark:bg-zinc-800 rounded-xl p-3'>
                <img src='./Images/c++.svg' alt='python' className='h-[18vh] w-full mx-[8vh]' />
              </div>
              <div className='h-[21vh] w-[32vh] my-4 bg-gray-300 dark:bg-zinc-800 rounded-xl p-3'>
                <img src='./Images/golang.svg' alt='python' className='h-[18vh] w-full' />
              </div>
              <div className='h-[21vh] w-[32vh] my-4 bg-gray-300 dark:bg-zinc-800 rounded-xl p-3'>
                <img src='./Images/javascript.svg' alt='python' className='h-[18vh] w-full' />
              </div>
            </div>
          </div>
          <div>
            <p className='flex justify-center bg-zinc-300 dark:bg-zinc-800 p-1 text-zinc-600 dark:text-zinc-600'>@CodeSync-2022 || All rights reserved</p>
          </div>
        </div>
      </div>
      <div className='grid place-content-center h-screen bg-zinc-900 md:hidden'>
        <p className='sm:text-2xl text-xl text-zinc-600'>This site doesn't support mobile-view</p>
      </div>
    </div>
  )
}

export default Homepage