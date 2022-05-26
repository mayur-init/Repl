import React, { useEffect, useRef } from 'react'
import Editor from '../components/Editor'
import SideBar from '../components/SideBar'
import {initSocket} from '../socket'
import {ACTIONS} from '../Actions';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast'

function Room() {

  const socketRef = useRef(null);
  const location = useLocation();
  const {roomId} = useParams();
  const reactNavigator = useNavigate();

  useEffect(() =>{
    async function init(){
      try{
        socketRef.current = await initSocket(); 
      }catch(err){
        console.log(err);
      }
     
      //socketRef.current.on('connect_error', (err) => handleErrors(err));
      //socketRef.current.on('connect_failed', (err) => handleErrors(err));

      const handleErrors = (err) => {
        console.log(`socket error ${err}`);
        toast.error('Socket connection failed, try again later.');
        //reactNavigator('/');
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        userName: location.state?.userName,
      });
    }

    init();
  },[]);
  
  return (
    <div>
      <div className='flex flex-row'>
        <div className='w-1/12 h-screen bg-zinc-900 p-4 min-w-max'><SideBar/></div>
        <div className='w-11/12'><Editor/></div>
      </div>

    </div>
  )
}

export default Room