import React from 'react'
import { Link } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';
import DarkModeButton from '../components/DarkModeButton';
import { HiOutlineCode } from 'react-icons/hi';

function Homepage() {

  //using dark theme;
  const [colorTheme, setTheme] = useDarkMode();

  return (
    <div className='bg-gray-200 dark:bg-zinc-900 h-screen py-6'>
      <div className='flex flex-row justify-end h-[15vh] px-6'>
        {/* <DarkModeButton /> */}
      </div>
      <div className='p-6 m-4'>
        <p className='flex justify-center p-3 md:text-6xl text-5xl text-zinc-400'>CodeSync<HiOutlineCode className='m-2' /></p>
      </div>
      <div className='grid place-content-center pt-8 bg-gray-300 dark:bg-zinc-800 w-auto flex-shrink'>
        <div className='flex'>
          {/* <img src='./Images/team.svg' alt='team' className='m-4 h-[45.4vh] w-[55vh]' /> */}
          <div className='flex flex-col justify-center items-center p-2 shrink'>
            <p className='md:text-3xl text-xl break-normal hidden md:contents text-zinc-500 m-2'>CodeSync is a realtime code colaboration tool for learners.</p>
            <p className='flex justify-center md:text-4xl text-2xl break-words text-zinc-500 m-2'>Haven't used CodeSync yet?</p>
            <p className='flex justify-center md:text-2xl text-xl text-zinc-500 m-2'>Create your first room now.</p>
            <Link to='/room' className='flex justify-center m-4'><button className='btn btn-primary border-2 m-4 animate-bounce'>Rooms</button></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage