import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import Client from '../components/Client';
import MessageBox from './MessageBox';
import { RoomContext } from '../Contexts/RoomContext';
import {HiOutlinePencilAlt, HiOutlineAnnotation, HiOutlinePlusCircle,
     HiOutlineUserCircle, HiOutlineLogout, HiOutlineMicrophone} from 'react-icons/hi';

function SideBar() {

    const { clients, roomId, isAudioEnabled, setAudioEnabled } = useContext(RoomContext);
    const clientList = clients;
    const [isActive, setIsActive] = useState(false);
    const [messageBox, setMessageBox] = useState(false);


    //console.log(props);
    const reactNavigator = useNavigate();

    const copyRoomId = async () => {
        try {
            //console.log(props.roomId);
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID copied to clipboard')
        }
        catch (err) {
            toast.error('could not copy roomId ')
        }
    };

    const leaveRoom = () => {
        //redirect to login page
        reactNavigator('/');
    };

    return (
        <div className='flex h-screen'>
            <div className='bg-gray-100 dark:bg-zinc-900 h-screen w-[60px] flex flex-col shadow-xl justify-center p-2'>
                <div className='flex flex-col h-full justify-end'>
                    <button onClick={copyRoomId}><HiOutlinePlusCircle size={36} className='text-zinc-400 my-2'/></button>
                    <button onClick={() => { setIsActive(!isActive) }}><HiOutlineUserCircle size={36} className='text-zinc-400 my-2'/></button>
                    {/* <button><HiOutlinePencilAlt size={36} className='text-zinc-400 my-2'/></button> */}
                </div>

                <div className='flex flex-col justify-end h-full'>
                    <button onClick={() => { setMessageBox(!messageBox) }}><HiOutlineAnnotation size={36} className='text-zinc-400 my-2'/></button>
                    {/* <button onClick={() => { setAudioEnabled(!isAudioEnabled)}}><HiOutlineMicrophone size={36} className='text-zinc-400 my-2'/></button> */}
                    <button onClick={leaveRoom} className='self-end mb-4'><HiOutlineLogout size={36} className='text-zinc-400 my-2'/></button>
                </div>

            </div>
            {isActive ? (<div className='flex flex-col bg-gray-100 dark:bg-zinc-900 ml-[7.4vh] my-[12vh] w-[25vh] dark:border-2 dark:border-zinc-700 rounded-md h-[56vh] p-4 justify-between absolute z-10'>
                <div>
                    <h3 className='text-zinc-400 my-2'>Connected: <span className='text-zinc-400 m-1'>{clients.length}</span></h3>
                    <hr className='border-zinc-200 dark:border-zinc-700 bottom-2' />
                    <div className='clientList h-[47vh] overflow-y-auto'>
                        {
                            clientList.map((client) => (
                                <Client
                                    key={client.socketId}
                                    userName={client.userName}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>) : null}

            {messageBox ? (<MessageBox />) : null}
        </div>

    )
}

export default SideBar