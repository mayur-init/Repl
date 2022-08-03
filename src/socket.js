import { io } from 'socket.io-client';


let url = 'http://localhost:5000/';

if (process.env.REACT_APP_NODE_ENV === 'production') {
    url = process.env.REACT_APP_BACKEND_URL;
}

export const initSocket = async () => {
    const options = {
        'force new connection': true,
        reconnetionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };

    return io(url, options);
    //console.log(process.env.REACT_APP_BACKEND_URL);
};