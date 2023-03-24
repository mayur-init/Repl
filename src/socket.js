import { io } from 'socket.io-client';

let url = process.env.REACT_APP_BACKEND_URL;


export const initSocket = async () => {
    const options = {
        path: process.env.REACT_APP_BACKEND_URL,
        'force new connection': true,
        reconnetionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };

    return io(url, options);
    //console.log(process.env.REACT_APP_BACKEND_URL);
};