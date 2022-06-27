import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';

function MessageBox({ socketRef, location, roomId }) {

    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const userName = location.state?.userName;

    async function sendMessage() {
        if (message !== '') {
            const messageData = {
                roomId,
                socketId: location.state?.socketId,
                message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            }
        }

        if (userName === location.state?.userName) {
            setMessageList((list) => [...list, message]);
        } else {
            //do something...
        }
    }

    const handleInputEnter = (e) => {
        //console.log('event', e.code);
        if (e.code === 'Enter') {
            setMessage('');
            sendMessage();
        }
    }

    return (
        <div className='flex flex-col justify-end pb-[9vh] h-screen'>
            <div className=' grid place-content-end bg-zinc-800 border-zinc-700 border-2 shadow-xl h-[50vh] w-[30vh] rounded-md p-3 m-2 absolute z-10'>
                <div className='self-end'>
                    <p className='text-white text-xl bg-black py-1 px-2 mr-2 rounded-2xl'>{message}</p>
                </div>
                <input type='text' onChange={(e) => { setMessage(e.target.value) }} value={message} onKeyUp={handleInputEnter} placeholder='Hey...' className='px-3 py-1 bg-zinc-200 w-full rounded-md'></input>
            </div>
        </div>
    )
}

export default MessageBox