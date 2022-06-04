const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const { ACTIONS } = require('../src/Actions');
const router = express.Router();
const codeRunController = require('./codeRunController');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//must be stored in a consistent db
const userSocketMap = {};

function getAllConnectedClients(roomId){

   return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) =>{
       return{
           socketId,
           userName: userSocketMap[socketId],
       };
   });
}

io.on('connection', (socket) =>{
    //console.log(`socket connected, socket Id: ${socket.id}`);

    //listening to the client socket
    socket.on(ACTIONS.JOIN, ({roomId, userName}) => {
        userSocketMap[socket.id] = userName;
        socket.join(roomId);

        const clients = getAllConnectedClients(roomId);
        //console.log(clients);   
        clients.forEach(({socketId}) =>{
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                userName,
                socketId: socket.id,    
            })
        })
        //console.log(userSocketMap);
    });

    //listening for code-change
    socket.on(ACTIONS.CODE_CHANGE, ({roomId, code}) =>{
        //emiting code to all the clients in the room
        //console.log(code);
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, {code});
    });

    //listening for sync-code
    socket.on(ACTIONS.SYNC_CODE, ({code, socketId}) =>{
        //emiting code to all the clients in the room
        //console.log(code);
        //console.log(socketId);
        
        io.to(socketId).emit(ACTIONS.SYNC_CODE, {code});
    });

    //listening for language change
    socket.on('lang_change', ({lang, roomId}) =>{
        socket.in(roomId).emit('lang_change', {lang});
        //console.log(lang +' '+ roomId);
    })

    //listening to input change
    socket.on('input_change', ({input, roomId}) =>{
        //console.log(inputRef);
        socket.in(roomId).emit('input_change', {input});
    })

    //disconnecting client
    socket.on('disconnecting', () =>{
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) =>{
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                userName: userSocketMap[socket.id],
            })
        });
        delete userSocketMap[socket.id];
        //console.log(userSocketMap);
        socket.leave();
    })

})

router.get('/', (req, res) =>{res.send('<h3>Express server is running...</h3>')});
router.post('/compile', codeRunController.codeRun);

server.listen(PORT, () => {console.log(`listening on port ${PORT}...`)});