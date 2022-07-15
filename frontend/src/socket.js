import {io} from 'socket.io-client';

export const initSocket = async () => {
    const options = {
        'force new connection':true,
        reconnetionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };

    return io('http://localhost:5000/', options); 
    //console.log(process.env.REACT_APP_BACKEND_URL);
};