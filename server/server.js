const express = require('express');
const http = require('http');
const {Server} = require('socket.io');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) =>{
    console.log(`socket connected, socket Id: ${socket.id}`);
})

app.get('/', (req, res)=>{
    res.send(`<h3>Express server is running...<h3>`);
})

server.listen(PORT, () => {console.log(`listening on port ${PORT}...`)});