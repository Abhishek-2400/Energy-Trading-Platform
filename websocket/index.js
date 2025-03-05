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

    socket.emit('bids', bids); // Initial emit of bids only the new user
    console.log('Bids emitted');

    // Listen for updated bids
    socket.on('newBid', (updatedBids) => {
        bids = updatedBids;
        io.emit('bids', bids); // Broadcast updated bids to all
    });

    // Emit simulated meter readings
    const meterInterval = setInterval(() => {
        const currentTime = new Date().toLocaleTimeString();
        // Simulate variable production (0-10 kW)
        const newProduction = Math.floor(Math.random() * 15);
        // Simulate variable consumption (0-5 kW)
        const newConsumption = Math.floor(Math.random() * 5);
        const balance = newProduction - newConsumption;
        console.log('new prod', newProduction)
        socket.emit('meterReadingUpdate', { time: currentTime, reading: newProduction, production: newProduction, consumption: newConsumption, balance: balance });
    }, 1000); // Emit data every 1 second


    socket.on('disconnect', () => {
        console.log('Client dissconnected');
        clearInterval(meterInterval);
    });


});


// Countdown timer for bids
setInterval(() => {
    bids = bids.map((bid) => {
        if (bid.timer > 0) {
            bid.timer = bid.timer - 1;
        }
        return bid;
    });
    io.emit('bids', bids); // Broadcast updated bids with timer
}, 1000);

app.get('/', (req, res) => {
    res.send('Server is running');
});

server.listen(5500, () => {
    console.log('Server is running on port 5500');
});

