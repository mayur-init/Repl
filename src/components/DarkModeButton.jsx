import React, { useContext } from 'react';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';
import { RoomContext } from '../Contexts/RoomContext';
import useDarkMode from '../hooks/useDarkMode';

function DarkModeButton({setDarkMode}) {

const [colorTheme, setTheme] = useDarkMode();
    return (
        <div>
            <button onClick={() =>{setTheme(colorTheme)}} className='text-zinc-400 hover:text-zinc-600 hover:scale-110 text-2xl my-1'>
                {colorTheme === 'dark'?(<HiOutlineSun/>):(<HiOutlineMoon/>)}</button>
        </div>
    )
}

export default DarkModeButton