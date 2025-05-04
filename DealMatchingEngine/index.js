const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: '*' },
});

io.on('connection', (socket) => {  // isme socket ka kaam nhi hai ye bas aise hi laga hai 
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

setInterval(async () => {
    try {
        //const response = await axios.get('http://localhost:3000/api/products/getsupplydemand');
        const response = await axios.get('https://energytrading.vercel.app/api/products/getsupplydemand');
        const sellers = response.data.sellers;
        const buyers = response.data.buyers;

        const matches = [];

        // Flatten seller products into list with seller reference
        const allProducts = sellers.flatMap(seller => {
            return seller.products.map(product => ({
                sellerEmail: seller.email,
                ...product // includes id, priceperunit, tokens
            }));
        });

        // Sort products by price (ascending)
        allProducts.sort((a, b) => a.priceperunit - b.priceperunit);

        console.log('All Products:', allProducts);
        console.log('Buyers:', buyers);

        for (const buyer of buyers) {
            let demand = buyer.buyerPreference.demand;
            if (demand <= 0) continue; // Skip if no demand
            for (const product of allProducts) {
                if (product.tokens <= 0) continue;
                if (buyer.email === product.sellerEmail) continue;
                if (product.priceperunit > buyer.buyerPreference.price) continue;

                const matchedUnits = Math.min(demand, product.tokens);

                matches.push({
                    buyer: buyer.email,
                    seller: product.sellerEmail,
                    units: matchedUnits,
                    price: product.priceperunit,
                    productUsed: product.id,
                });

                demand -= matchedUnits;
                product.tokens -= matchedUnits;
            }
        }

        console.log('Matched Results:', matches);

        //send here to smart contract for trasaction execution 
       // const response2 = await axios.post('http://localhost:3000/api/products/autotrading', { matches });
        const response2 = await axios.post('https://energytrading.vercel.app/api/products/autotrading', { matches });
        console.log('Response from auto trading:', response2.data);

    } catch (err) {
        console.log('Error fetching supply demand data:', err.message);
    }
}, 10000);

app.get('/', (req, res) => {
    res.send('Server is running');
});

server.listen(5600, () => {
    console.log('Server is running on port 5600');
});



//test case to be used :
// manik --> demand 10 tokens
// ramu --> prod1 : 6 tokens, prod2 : 2 tokens, prod3 : 1 tokens ,  prod4 2 tokens


//manik will be matched with ramu afetr which ramu will have 0 tokens left of each prodct except prod 3 


