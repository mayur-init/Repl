import { io } from 'socket.io-client';

let url = 'https://codesync-init.herokuapp.com/';

    if (process.env.NODE_ENV == 'devlopment') {
      url = 'http://localhost:5000/';
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