const express = require('express'); // express module to create a server
const http = require('http'); // http module to create a http server
const socketIo = require('socket.io'); // socket.io module to create a websocket server

const app = express(); // express application
const server = http.createServer(app); //Wraps the Express app inside an HTTP server.

// Browser sends GET / → handled by Express.
// Socket.IO client connects → same server upgrades to WebSocket.

//express is a req handler it can't upgrade http to websocket connection for this we need a http webserver 
// so we create a http server and pass the express app to it.


const io = socketIo(server, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket) => {
    console.log('New client connected');


    // fetch supply demand & process them  () ....

    socket.on('disconnect', () => {
        console.log('Client dissconnected');
        clearInterval(meterInterval);
    });


});



app.get('/', (req, res) => {
    res.send('Server is running');
});

server.listen(5600, () => {
    console.log('Server is running on port 5600');
});

