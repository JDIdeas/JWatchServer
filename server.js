const express = require('express');
const { Server: SocketServer } = require('socket.io');
const { createServer } = require('http');

const app = express();
const httpServer =  createServer(app);
const io =  new SocketServer(httpServer, {
    cors: {
        origin: true,
        credentials: true,
    },
});

app.get('/', (req, res) =>{
    res.send("Server is Running")
})

io.on('connection', (socket) =>{
    socket.on('pingServer', () =>{
        socket.emit('pingClient', `Recived from Server on ${Date()}`)
    })
})

const PORT = 3000;

app.listen(PORT)