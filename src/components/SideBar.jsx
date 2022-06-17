import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import Client from '../components/Client';

function SideBar(props) {

    const clients = props.clients;
    const [isActive, setIsActive] = useState(false);
    //console.log(props);
    const reactNavigator = useNavigate();

    const copyRoomId = async () => {
        try {
            //console.log(props.roomId);
            await navigator.clipboard.writeText(props.roomId);
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
            <div className='bg-zinc-900 h-screen w-[60px] flex flex-col justify-center p-2'>
                <div className='flex flex-col h-full justify-end'>
                    <button onClick={copyRoomId} className='text-zinc-400 py-2'><svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg></button>
                    <button onClick={() =>{setIsActive(!isActive)}} className='text-zinc-400 py-2'><svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg></button>
                    <button className='text-zinc-400 py-2'><svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg></button>
                </div>

                <div className='flex flex-col justify-end h-full'>
                    <button onClick={leaveRoom} className='text-zinc-400 py-2 self-end'><svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
                    </svg></button>
                </div>

            </div>
            {isActive?(<div className='flex flex-col min-w-max h-full p-4 justify-between w-1/12'>
                <div>
                    <h1 className='text-2xl text-zinc-400 m-4'>Code<span>Sync</span></h1>
                    <hr className='border-zinc-800 bottom-2' />
                    <h3 className='text-zinc-400 my-2'>Connected <span className='text-zinc-600 bg-transparent border-zinc-600 border-2 rounded-full m-1 px-2'>{clients.length}</span></h3>
                    <hr className='border-zinc-800 bottom-2' />
                    <div className='clientList'>
                        {
                            clients.map((client) => (
                                <Client
                                    key={client.socketId}
                                    userName={client.userName}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>):null}
        </div>

    )
}

export default SideBar