import React, {useState} from 'react'
import toast from 'react-hot-toast';
import {v4 as uuidv4} from 'uuid'
import { useNavigate } from 'react-router-dom';

function Roomlogin() {

  const navigate = useNavigate();
  //creating states
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');

  const createNewRoom = (e) =>{
    e.preventDefault();
    const id = uuidv4();
    setRoomId(id);
    toast.success('Created new room');
    //console.log(id);
  }

  const joinRoom = () =>{
    if(!roomId || !userName){
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

  const handleInputEnter = (e) =>{
    //console.log('event', e.code);
    if(e.code === 'Enter'){
      joinRoom()
    }
  }

  return (
    <div className='bg-zinc-900 h-screen grid place-items-center min-w-max p-4'>

      <div className='container bg-zinc-800 w-1/4 p-7 flex flex-col rounded-xl min-w-max'>
        <h1 className='text-2xl text-zinc-400 mb-6'>Code<span className='text-zinc-500 px-1'>Sync</span></h1>
       
        <h4 className='text-zinc-400 py-2'>Paste your room Id</h4>
        <input type='text' onChange={(e) =>{setRoomId(e.target.value)}} value={roomId} onKeyUp={handleInputEnter} placeholder='roomId' className='px-3 py-1 mb-6 bg-zinc-200 rounded-md'></input>

        <input type='text' onChange={(e) =>{setUserName(e.target.value)}} value={userName} onKeyUp={handleInputEnter} placeholder='username' className='px-3 py-1 mb-6 bg-zinc-200 rounded-md'></input>

        <button onClick={joinRoom} className='btn btn-primary self-end '>Join</button>

        <span className='text-zinc-500 py-1 text-sm self-end'>
          if you haven't an invite then create&nbsp;
          <button onClick={createNewRoom} className='text-zinc-400 hover:text-zinc-500 pt-2 pl-1'>new room</button>
        </span>
      </div>
    </div>
  )
}

export default Roomlogin