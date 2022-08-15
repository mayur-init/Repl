import React from 'react'
import { Link } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';
import DarkModeButton from '../components/DarkModeButton';
import { HiOutlineCode } from 'react-icons/hi';

function Homepage() {

  const [colorTheme, setTheme] = useDarkMode();

  return (
    <div className='bg-gray-200 dark:bg-zinc-900 h-screen py-4'>
      <div className='flex flex-row justify-between h-[15vh] px-6'>
        <p className=' flex md:text-2xl text-xl text-zinc-400'>CodeSync<HiOutlineCode className='mx-2 my-[6px]'/></p>
        <Link to='/room' className='flex justify-center'><button className='btn btn-primary border-2 animate-bounce'>Rooms</button></Link>
        {/* <DarkModeButton /> */}
      </div>
      <div className='m-4 md:pb-6'>
        <p className='flex justify-center p-3 md:text-5xl text-4xl text-zinc-400'>CodeSync<HiOutlineCode className='m-2' /></p>
      </div>
      <div className='grid place-content-center pt-8 bg-gray-300 dark:bg-zinc-800 w-auto flex-shrink'>
        <div className='flex'>
          {/* <img src='./Images/team.svg' alt='team' className='m-4 h-[45.4vh] w-[55vh]' /> */}
          <div className='flex flex-col justify-center h-auto items-center p-3 shrink'>
            <p className='md:text-3xl text-xl break-normal hidden md:contents text-zinc-500 m-2'>CodeSync is a online compiler that supports realtime collaboration feature.</p>
            <p className='flex justify-center md:text-4xl text-[25px] break-words text-zinc-500 m-2'>Haven't used CodeSync yet?</p>
            <p className='flex justify-center md:text-2xl text-xl text-zinc-500 mt-2 mb-8'>Create your first room now.</p>
          </div>
        </div>
      </div>
      <div className='flex justify-center h-[160vh] md:h-full bg-zinc-900 p-[4vh] md:p-[20vh] md:mt-[15vh]'>
        <div className='grid md:grid-cols-3 h-[60vh] w-[120vh] justify-items-center '>
          <div className='h-[21vh] w-[35vh] m-4 bg-zinc-800 rounded-xl p-3'>
            <img src='./Images/c++.svg' alt='python' className='h-[18vh] w-full mx-[8vh]'/>
          </div>
          <div className='h-[21vh] w-[35vh] m-4 bg-zinc-800 rounded-xl p-3'>
            <img src='./Images/python.svg' alt='python' className='h-[18vh] w-full mx-[7vh]'/>
          </div>
          <div className='h-[21vh] w-[35vh] m-4 bg-zinc-800 rounded-xl p-3'>
            <img src='./Images/javascript.svg' alt='python' className='h-[18vh] w-full'/>
          </div>
          <div className='h-[21vh] w-[35vh] m-4 bg-zinc-800 rounded-xl p-3'>
            <img src='./Images/python.svg' alt='python' className='h-[18vh] w-full mx-[7vh]'/>
          </div>
          <div className='h-[21vh] w-[35vh] m-4 bg-zinc-800 rounded-xl p-3'>
            <img src='./Images/python.svg' alt='python' className='h-[18vh] w-full mx-[7vh]'/>
          </div>
          <div className='h-[21vh] w-[35vh] m-4 bg-zinc-800 rounded-xl p-3'>
            <img src='./Images/python.svg' alt='python' className='h-[18vh] w-full mx-[7vh]'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage