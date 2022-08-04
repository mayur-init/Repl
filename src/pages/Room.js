import React, { useEffect, useRef, useState } from 'react'
import Editor from '../components/Editor'
import SideBar from '../components/SideBar'
import { initSocket } from '../socket'
import { ACTIONS } from '../Actions';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast'
import { RoomContext } from '../Contexts/RoomContext';
import useDarkMode from '../hooks/useDarkMode';

function Room() {

  const socketRef = useRef(null);
  let codeRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [isAudioEnabled, setAudioEnabled] = useState(false);

  let langRef = useRef('C++');
  let inputRef = useRef(null);
  let outputRef = useRef(null);
  
 
  //using dark theme;
  const [colorTheme, setTheme] = useDarkMode();
  
  useEffect(() => {
    async function init() {

      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      const handleErrors = (err) => {
        console.log(`socket error ${err}`);
        toast.error('Socket connection failed, try again later.');
        reactNavigator('/room');
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        userName: location.state?.userName,
      });

      //console.log(location.state);

      //listening for joined event
      socketRef.current.on(ACTIONS.JOINED, ({ clients, userName, socketId }) => {

        if (userName !== location.state?.userName) {
          toast.success(`${userName} joined the room`);
          //console.log(`${userName} joined`);
        }
        setClients(clients);
        //console.log(clients);
        //console.log(socketId);
        //syncing code
        //console.log(langRef.current, outputRef.current);
        socketRef.current.emit(ACTIONS.SYNC_CODE, {
          code: codeRef.current,
          lang: langRef.current,
          input: inputRef.current,
          output: outputRef.current,
          socketId,
        });
      })

      //listening for disconnected event
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, userName }) => {
        toast.success(`${userName} left the room`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        })

      })
    }

    init();

    //cleaning function
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    }
  }, [outputRef, colorTheme]);

  //--------------------audio connection configuration---------------------------
  // useEffect(() =>{
  //    //sending audio stream
  //    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  //    if(isAudioEnabled){
  //      getUserMedia({audio: true}, (mediaStream) =>{
  //        socketRef.current.emit('sendingMediaStream', (mediaStream, roomId, location.state.userName));
  //      })
  //    }

  //   //listening for audio streams
  //   if(socketRefcurrent != null){
  //     socketRef.current.on('recievingMediaStream', ({mediaStream, userName}) =>{
  //       recievedMediaStream.current.srcObject = mediaStream;
  //       recievedMediaStream.current.play();
  //     }) 
  //   }

  //   return(() =>{
  //     socketRef.current.off('recievedMediaStream');
  //   })
  // });
  

  return (
    <div>
      <div className='flex flex-row'>
      <RoomContext.Provider value={{socketRef, roomId, location, clients, codeRef, inputRef,
       outputRef, langRef, messageList, setMessageList, colorTheme
      }}>
          <div className='w-full'>
          <Editor />
          </div>
          </RoomContext.Provider>
      </div>

    </div>
  )
}

export default Room