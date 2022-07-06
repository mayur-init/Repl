import React from 'react'
import { Link } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';
import DarkModeButton from '../components/DarkModeButton';

function Homepage() {

  //using dark theme;
  const [colorTheme, setTheme] = useDarkMode();

  return (
    <div className='bg-gray-200 dark:bg-zinc-900 h-screen min-w-max py-6'>
      <div className='flex flex-row justify-end h-[10vh] px-6'>
        <DarkModeButton/>
      </div>
      <p className='flex justify-center p-6 m-6 text-6xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>CodeSync</p>
      <div className='grid justify-center p-6  h-fit bg-gray-300 dark:bg-zinc-800'>
        <div className=''>
          <p className='text-3xl text-zinc-500 m-4'>CodeSync is a realtime code colaboration tool for learners.</p>
          <p className='flex justify-center text-4xl text-zinc-500 m-4'>Haven't used CodeSync yet?</p>
          <p className='flex justify-center text-2xl text-zinc-500 m-4'>Create your first room now.</p>
          <Link to='/room' className='flex justify-center m-4'><button className='btn btn-primary border-2 m-4 animate-bounce'>Rooms</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Homepage