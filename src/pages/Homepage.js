import React from 'react'
import { Link } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';
import DarkModeButton from '../components/DarkModeButton';

function Homepage() {

  //using dark theme;
  const [colorTheme, setTheme] = useDarkMode();

  return (
    <div className='bg-white dark:bg-zinc-900 h-screen min-w-max p-6'>
      <div className='flex flex-row justify-end h-[10vh]'>
        <DarkModeButton/>
      </div>

      <div className='grid justify-center h-fit'>
        <div className='mt-[24vh]'>
          <p className='text-6xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1'>Code Sync</p>
          <Link to='/room' className='flex justify-center m-4'><button className='btn btn-primary'>Rooms</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Homepage