import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';

function MessageBox({ socketRef, location, roomId }) {

    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const userName = location.state?.userName;

    async function sendMessage() {
        if (message !== '') {
            const messageData = {
                roomId,
                userName: location.state?.userName,
                message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            await socketRef.current.emit('sending_message', messageData);
            setMessageList((list) => [...list, message]);
            setMessage('');
        }
    };

    useEffect(() => {
        socketRef.current.on('recieve_message', ({ userName, message, time }) => {
            const messageData = {
                userName,
                message,
                time,
            };
            //console.log(messageData);
            setMessageList((list) => [...list, messageData]);
        });
        return (() => {
            socketRef.current.off('recieve_message');
        })
    }, [socketRef]);

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
                <ScrollToBottom>
                    {messageList.map((messageContent) => {
                        let start = messageContent.userName === userName?'end':'start';
                        return (
                            <div key={messageList.length--} className='w-full'>
                                <div className={`flex justify-${start} w-full`}>
                                    <div className='grid w-[90%] bg-zinc-700 my-2 p-2 rounded-md'>
                                        {messageContent.userName !== userName?<p className='text-green-500 pb-1 text-sm'>{messageContent.userName}</p>:null}
                                        <p self-center className='text-white text-md break-word'>{messageContent.message}</p>
                                        <p className='justify-self-end text-white text-sm'>{messageContent.time}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
                <input type='text' onChange={(e) => { setMessage(e.target.value) }} value={message} onKeyUp={handleInputEnter} placeholder='Hey...' className='px-3 py-1 bg-zinc-200 w-full rounded-md'></input>
            </div>
        </div>
    )
}

export default MessageBox