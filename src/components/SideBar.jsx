import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import Client from '../components/Client';

function SideBar(props) {

    const clients = props.clients;
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
        <div className='flex flex-col min-w-max h-full justify-between'>
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
            <div className='flex flex-col justify-end'>
                <button onClick={copyRoomId} className='btn btn-primary self-start m-2'>Invite</button>
                <button onClick={leaveRoom} className='btn btn-primary self-start m-2'>Exit</button>
            </div>
        </div>
    )
}

export default SideBar