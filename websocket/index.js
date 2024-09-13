const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
    },
});

app.get('/', (req, res) => {
    res.send('Server is running');
});

setInterval(() => {
    const currentTime = new Date().toLocaleTimeString();
    const randomPrice = (Math.random() * 100).toFixed(2); // Simulating random energy price data

    io.emit('priceUpdate', { time: currentTime, price: randomPrice });
}, 50000); // Emit data every 2 seconds

server.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
