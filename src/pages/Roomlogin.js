import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';


function Roomlogin() {

  const [colorTheme, setTheme] = useDarkMode();

  const navigate = useNavigate();
  //creating states
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidv4();
    setRoomId(id);
    toast.success('Created new room');
    //console.log(id);
  }

  const joinRoom = () => {
    if (!roomId || !userName) {
      toast.error("Room Id and User Name required");
      return;
    }

    //redirect
    navigate(`/room/${roomId}`, {
      state: {
        userName,
      }
    })
  };

  const handleInputEnter = (e) => {
    //console.log('event', e.code);
    if (e.code === 'Enter') {
      joinRoom()
    }
  }

  return (
    <div className='flex flex-col justify-center bg-gray-200 dark:bg-zinc-900 h-screen min-w-max min-h-max'>
        <div className='grid place-content-center bg-gray-300 dark:bg-zinc-800 min-w-max'>
          <div className='flex justify-center w-screen'>
          {/* <img src='./Images/learning.svg' alt='learning' className='m-6 w-[30vh] md:w-[70vh] shrink' /> */}
          <div className='container shrink-0 self-center flex flex-col bg-gray-300 dark:bg-zinc-900 md:w-[45vh] w-[80%] h-auto p-4 m-8 shadow-xl dark:shadow-sm rounded-xl'>
            <h1 className='text-2xl text-zinc-600 dark:text-zinc-400 mb-6'>CodeSync</h1>

            <h4 className='text-gray-600 dark:text-zinc-400 py-2'>Paste your room Id</h4>
            <input type='text' onChange={(e) => { setRoomId(e.target.value) }} value={roomId} onKeyUp={handleInputEnter} placeholder='roomId' className='px-3 py-1 mb-6 text-gray-700 bg-zinc-200 rounded-md'></input>

            <input type='text' onChange={(e) => { setUserName(e.target.value) }} value={userName} onKeyUp={handleInputEnter} placeholder='username' className='px-3 py-1 mb-6 text-gray-700 bg-zinc-200 rounded-md'></input>

            <button onClick={joinRoom} className='btn btn-primary self-end border-2 animate-bounce'>Join</button>

            <span className='text-gray-600 dark:text-zinc-500 py-1 text-sm self-end'>
              Haven't an invite? create&nbsp;
              <button onClick={createNewRoom} className='text-sm text-gray-600 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-600 pt-2 pl-1'>new room</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Roomlogin