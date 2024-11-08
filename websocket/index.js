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

let bids = [
    { sno: 1, sellerName: "John Energy Co.", highestBid: 150, bid: "", timer: 300 },
    { sno: 2, sellerName: "SolarMax Ltd.", highestBid: 300, bid: "", timer: 3600 },
    { sno: 3, sellerName: "WindFlow Corp.", highestBid: 200, bid: "", timer: 1800 },
    { sno: 4, sellerName: "GreenWave Energy", highestBid: 400, bid: "", timer: 7200 },
    { sno: 5, sellerName: "EcoFuel Power", highestBid: 250, bid: "", timer: 20 },
];

let meterReading = 0.0; // Initialize a base meter reading value

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.emit('bids', bids); // Initial emit of bids
    console.log('Bids emitted');

    // Listen for updated bids
    socket.on('newBid', (updatedBids) => {
        bids = updatedBids;
        io.emit('bids', bids); // Broadcast updated bids
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Emit simulated meter readings
setInterval(() => {
    const currentTime = new Date().toLocaleTimeString();

    // Increment reading by a small random amount and ensure it's a number
    const increment = parseFloat((Math.random() * 0.5).toFixed(2));
    meterReading = parseFloat((meterReading + increment).toFixed(2)); // Ensure reading stays realistic

    io.emit('meterReadingUpdate', { time: currentTime, reading: meterReading });
}, 10000); // Emit data every 10 seconds

// Countdown timer for bids
setInterval(() => {
    bids = bids.map((bid) => {
        if (bid.timer > 0) {
            bid.timer = bid.timer - 1;
        }
        return bid;
    });
    io.emit('bids', bids); // Broadcast updated bids with timer
}, 1000); // Emit data every second

app.get('/', (req, res) => {
    res.send('Server is running');
});

server.listen(5000, () => {
    console.log('Server is running on port 5000');
});
