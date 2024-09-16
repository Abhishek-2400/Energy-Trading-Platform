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

let bids = [{ sno: 1, sellerName: "John Energy Co.", highestBid: 150, bid: "", timer: 300 },
{ sno: 2, sellerName: "SolarMax Ltd.", highestBid: 300, bid: "", timer: 3600 },
{ sno: 3, sellerName: "WindFlow Corp.", highestBid: 200, bid: "", timer: 1800 },
{ sno: 4, sellerName: "GreenWave Energy", highestBid: 400, bid: "", timer: 7200 },
{ sno: 5, sellerName: "EcoFuel Power", highestBid: 250, bid: "", timer: 20 },
];

io.on('connection', (socket) => {
    console.log('New client connected'); // Debugging

    socket.emit('bids', bids);
    console.log('Bids emitted');
    // Listen for updated bids(price) 
    socket.on('newBid', (updatedBids) => {
        bids = updatedBids;
        io.emit('bids', bids); // Broadcast new bids(price)
    });

    // Debugging disconnection events
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


setInterval(() => {
    const currentTime = new Date().toLocaleTimeString();
    const randomPrice = (Math.random() * 100).toFixed(2); // Simulating random energy price data

    io.emit('priceUpdate', { time: currentTime, price: randomPrice });
}, 10000); // Emit data every second for testing 

setInterval(() => {
    bids = bids.map((bid) => {
        if (bid.timer > 0) {
            bid.timer = bid.timer - 1;
        }
        return bid;
    })
    io.emit('bids', bids); // Broadcast new bids
}, 1000); // Emit data every second for testing


app.get('/', (req, res) => {
    res.send('Server is running');
});

server.listen(5000, () => {
    console.log('Server is running ');
});
