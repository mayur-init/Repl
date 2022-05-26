import React, { useEffect, useRef, useState } from 'react'
import Editor from '../components/Editor'
import SideBar from '../components/SideBar'
import { initSocket } from '../socket'
import { ACTIONS } from '../Actions';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast'

function Room() {

  const socketRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function init() {

      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      //console.log(roomId);

      const handleErrors = (err) => {
        console.log(`socket error ${err}`);
        toast.error('Socket connection failed, try again later.');
        reactNavigator('/room');
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        userName: location.state?.userName,
      });

      //console.log(roomId);

      //listening for joined event
      socketRef.current.on(ACTIONS.JOINED, ({clients, userName, socketId}) =>{
        
        if(userName !== location.state?.userName){
          toast.success(`${userName} joined`);
          //console.log(`${userName} joined`);
        }
        setClients(clients);
        //console.log(clients);
      })
    }

    init();
    //console.log(clients);
  }, []);


  return (
    <div>
      <div className='flex flex-row'>
        <div className='w-1/12 h-screen bg-zinc-900 p-4 min-w-max'><SideBar clients={clients}/></div>
        <div className='w-11/12'><Editor /></div>
      </div>

    </div>
  )
}

export default Room