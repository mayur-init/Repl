import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';
import { RoomContext } from '../Contexts/RoomContext';
import {AiOutlineExpand} from 'react-icons/ai';

function MessageBox() {

    const { socketRef, location, roomId, messageList, setMessageList} = useContext(RoomContext);
    const [message, setMessage] = useState('');
    const userName = location.state?.userName;


    async function sendMessage() {
        if (message !== '') {
            const messageData = {
                roomId,
                userName: location.state?.userName,
                message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            const currentMessageData ={
                message,
                userName: location.state?.userName,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            }
            await socketRef.current.emit('sending_message', messageData);
            setMessageList((list) =>[...list, currentMessageData]);
            setMessage('');
        }
    };

    useEffect(() => {
        socketRef.current.on('recieve_message', ({userName, message, time }) => {
            const messageData = {
                message,
                userName,
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
            sendMessage();
            setMessage('');
        }
    }

    return (
        <div className='flex flex-col justify-end pb-[9vh] h-[64vh] content-end mt-[27vh]'>
            <div className=' grid place-content-end bg-gray-200 dark:bg-zinc-900 border-zinc-700 dark:border-2 h-[56.8vh] w-[33vh] rounded-md p-3 m-3 absolute z-10'>
                <ScrollToBottom className='h-[49vh] py-2'>
                    {messageList.map((messageContent, index) => {
                        let start = messageContent.userName === userName?'end':'start';
                        return (
                            <div key={index}>
                                <div className={`flex justify-${start} w-full`}>
                                    <div className='grid max-w-[26vh] overflow-auto mx-2 bg-gray-400 dark:bg-zinc-600 shadow-md my-2 py-1 px-2 rounded-md'>
                                        {messageContent.userName !== userName?<p className='text-violet-400 pb-1 text-sm'>{messageContent.userName}</p>:null}
                                        <p className='self-center text-white text-md break-normal'>{messageContent.message}</p>
                                        {/* <p className='justify-self-end text-white text-xs'>{messageContent.time}</p> */}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
                <input type='text' onChange={(e) => { setMessage(e.target.value) }} value={message} onKeyUp={handleInputEnter} placeholder='Hey...' className='px-3 py-1 text-zinc-700 bg-zinc-300 w-full shadow-xl rounded-md'></input>
            </div>
        </div>
    )
}

export default MessageBox