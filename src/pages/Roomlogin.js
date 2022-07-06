import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom';

function Roomlogin() {

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
    <div className='bg-gray-200 dark:bg-zinc-900 h-screen grid place-items-center min-w-max p-4'>
      <div className='item-center bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl w-[45vh] md:w-[52vh] h-[38vh] -inset-3 blur opacity-20 hover:opacity-60 hover:transition duration-1000 hover:duration-800 animate-pulse'></div>
        <div className='absolute container bg-gray-300 dark:bg-zinc-800 w-1/4 p-7 flex flex-col shadow-2xl dark:shadow-none rounded-xl min-w-max '>
          <h1 className='text-2xl text-gray-600 dark:text-zinc-400 mb-6'>Code<span className='dark:text-zinc-500 px-1'>Sync</span></h1>

          <h4 className='text-gray-600 dark:text-zinc-400 py-2'>Paste your room Id</h4>
          <input type='text' onChange={(e) => { setRoomId(e.target.value) }} value={roomId} onKeyUp={handleInputEnter} placeholder='roomId' className='px-3 py-1 mb-6 text-gray-700 bg-zinc-200 rounded-md'></input>

          <input type='text' onChange={(e) => { setUserName(e.target.value) }} value={userName} onKeyUp={handleInputEnter} placeholder='username' className='px-3 py-1 mb-6 text-gray-700 bg-zinc-200 rounded-md'></input>

          <button onClick={joinRoom} className='btn btn-primary self-end border-2'>Join</button>

          <span className='text-gray-600 dark:text-zinc-500 py-1 text-sm self-end'>
            if you haven't an invite then create&nbsp;
            <button onClick={createNewRoom} className='text-gray-600 dark:text-zinc-400 hover:text-zinc-800  pt-2 pl-1'>new room</button>
          </span>
        </div>
    </div>
  )
}

export default Roomlogin