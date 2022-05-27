import React, { useEffect, useRef, useState } from 'react'
import Editor from '../components/Editor'
import SideBar from '../components/SideBar'
import { initSocket } from '../socket'
import { ACTIONS } from '../Actions';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast'

function Room() {

  const socketRef = useRef(null);
  let codeRef = useRef(null);
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
          toast.success(`${userName} joined the room`);
          //console.log(`${userName} joined`);
        }
        setClients(clients);
        //console.log(clients);
        //console.log(socketId);
        //syncing code
        socketRef.current.emit(ACTIONS.SYNC_CODE,{
          code: codeRef.current,
          socketId,
        });
        
      })

      //listening for disconnected event
      socketRef.current.on(ACTIONS.DISCONNECTED, ({socketId, userName}) =>{
        toast.success(`${userName} left the room`);
        setClients((prev) =>{
          return prev.filter((client) => client.socketId !== socketId);
        })
  
      })
    }

    init();

    //cleaning function
    return () =>{
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    }
  }, []);

  return (
    <div>
      <div className='flex flex-row'>
        <div className='w-1/12 h-screen bg-zinc-900 p-4 min-w-max'><SideBar clients={clients} roomId={roomId}/></div>
        <div className='w-11/12'><Editor socketRef={socketRef} roomId={roomId} onCodeChange={(code) => codeRef.current = code}/></div>
      </div>

    </div>
  )
}

export default Room