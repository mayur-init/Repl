const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const { ACTIONS } = require('../src/Actions');

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

app.get('/', (req, res)=>{
    res.send(`<h3>Express server is running...<h3>`);
})

server.listen(PORT, () => {console.log(`listening on port ${PORT}...`)});