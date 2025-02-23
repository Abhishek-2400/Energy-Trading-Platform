// "use client"
// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import { io } from 'socket.io-client';
// import Navbar from '../../../../components/Navbar/Navbar';
// import UserDashboard from '../../../../components/Dashboard/dashboard';
// import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
// import './page.css'
// ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

// const RealTimeGraph = () => {
//     const [dataPoints, setDataPoints] = useState({
//         labels: [],
//         datasets: [
//             {
//                 label: 'Meter Reading (kWh)',
//                 data: [],
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 fill: false,
//             },
//         ],
//     });

//     useEffect(() => {
//         // Connect to the server
//         // const socket = io('https://websocket-p2p.onrender.com');
//         const socket = io('http://localhost:5500');
//         socket.on('connect', () => {
//             console.log('Connected to server');
//         });
//         // Listen for meter reading updates
//         socket.on('meterReadingUpdate', (newData) => {  // Updated event name to 'meterReadingUpdate'
//             setDataPoints((prevData) => {
//                 const updatedLabels = [...prevData.labels, newData.time];
//                 const updatedData = [...prevData.datasets[0].data, newData.reading]; // Use 'reading' instead of 'price'

//                 return {
//                     labels: updatedLabels.slice(-10), // Show only the last 10 points
//                     datasets: [
//                         {
//                             ...prevData.datasets[0],
//                             data: updatedData.slice(-10), // Show only the last 10 points
//                         },
//                     ],
//                 };
//             });
//         });

//         // Cleanup on unmount
//         return () => {
//             socket.disconnect();
//         };
//     }, []);

//     return (
//         <>
//             <Navbar />
//             <div className="content-layout">
//                 <UserDashboard />
//                 <div className='chartcont'>
//                     <h2>Real-Time Meter Reading</h2>
//                     <Line
//                         data={dataPoints}
//                         options={{
//                             scales: {
//                                 x: {
//                                     title: {
//                                         display: true,
//                                         text: 'Time',
//                                     },
//                                 },
//                                 y: {
//                                     title: {
//                                         display: true,
//                                         text: 'Meter Reading (kWh)',
//                                     },
//                                     min: 0,
//                                 },
//                             },
//                         }}
//                     />
//                 </div>
//             </div>

//         </>
//     );
// };

// export default RealTimeGraph;








// "use client"
// import React, { useEffect, useState } from 'react';

// import { io } from 'socket.io-client';
// import Navbar from '../../../../components/Navbar/Navbar';
// import UserDashboard from '../../../../components/Dashboard/dashboard';

// import './page.css'

// const RealTimeGraph = () => {


//     useEffect(() => {
//         // Connect to the server
//         // const socket = io('https://websocket-p2p.onrender.com');
//         const socket = io('http://localhost:5500');
//         socket.on('connect', () => {
//             console.log('Connected to server');
//         });
//         // Listen for meter reading updates
//         socket.on('meterReadingUpdate', (newData) => {  // Updated event name to 'meterReadingUpdate'
//             const [time, prouction,consumption, balance] = [newData.time, newData.prouction, newData.consumption,newData.balance];

//         });

//         // Cleanup on unmount
//         return () => {
//             socket.disconnect();
//         };
//     }, []);

//     return (
//         <>

//         </>
//     );
// };

// export default RealTimeGraph;






// import React, { useEffect, useState } from 'react';

// import { io } from 'socket.io-client';
// import Navbar from '../../../../components/Navbar/Navbar';
// import UserDashboard from '../../../../components/Dashboard/dashboard';

// import './page.css'

// const RealTimeGraph = () => {




//     return (
//         <>

//         </>
//     );
// };

// export default RealTimeGraph;





"use client";
import React, { useState, useEffect } from 'react';
import { ArrowRight, Battery, Zap } from 'lucide-react';
import './page.css';
import Navbar from '../../../../components/Navbar/Navbar';
import UserDashboard from '../../../../components/Dashboard/dashboard';
import { io } from 'socket.io-client';

const RealTimeGraph = () => {

    const [solarProduction, setSolarProduction] = useState(0);
    const [consumption, setConsumption] = useState(0);
    const [tokens, setTokens] = useState(500);
    const [tokenOffers, setTokenOffers] = useState([]);
    const [gridBalance, setGridBalance] = useState(0);
    const [offerAmount, setOfferAmount] = useState('');
    const [offerPrice, setOfferPrice] = useState('');

    useEffect(() => {
        const socket = io('http://localhost:5500');
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('meterReadingUpdate', (newData) => {
            setSolarProduction(newData.production);
            setConsumption(newData.consumption);
            setGridBalance(newData.balance);
            if (newData.balance > 0) {
                setTokens(prev => prev + newData.balance);
            } else {
                setTokens(prev => Math.max(0, prev + newData.balance));
            }
        });

        return () => {
            if (socket1.connected) socket1.disconnect();
            if (socket2.connected) socket2.disconnect();
        };
    }, [userid]); // Ensure `userid` is set before sending messages

    const createOffer = async () => {
        if (!offerAmount || !offerPrice || offerAmount > tokens) return;

        const newOffer = {
            id: Date.now(),
            amount: parseInt(offerAmount),
            price: parseFloat(offerPrice),
            timestamp: new Date().toLocaleTimeString(),
            status: "active",
        };

        setTokenOffers(prev => [...prev, newOffer]);
        setTokens(prev => prev - parseInt(offerAmount));
        setOfferAmount('');
        setOfferPrice('');
    };

    const cancelOffer = (offerId) => {
        setTokenOffers(prev => {
            const offer = prev.find(o => o.id === offerId);
            if (offer && offer.status === 'active') {
                setTokens(t => t + offer.amount);
            }
            return prev.filter(o => o.id !== offerId);
        });
    };

    return (
        <div className="dashboard-page">
            <Navbar />
            <div className="content-layout">
                <UserDashboard />
                <div className="dashboard-content">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="card-title">
                                <Zap className="icon-yellow" />
                                Real-time P2P Energy Trading Platform
                            </h2>
                        </div>
                        <div className="card-content">
                            <div className="grid-container">
                                <div className="metrics-container">
                                    <div className="metric-box">
                                        <h3>Real-time Energy Flow</h3>
                                        <div className="energy-stats">
                                            <div className="stat">
                                                <div className="label production">Production</div>
                                                <div className="value">{solarProduction} kW</div>
                                            </div>
                                            <div className="stat">
                                                <div className="label consumption">Consumption</div>
                                                <div className="value">{consumption} kW</div>
                                            </div>
                                            <div className="stat">
                                                <div className="label balance">Grid Balance</div>
                                                <div className={`value ${gridBalance >= 0 ? 'positive' : 'negative'}`}>{gridBalance} kW</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="metric-box">
                                        <h3>Energy Tokens</h3>
                                        <div className="token-balance">{tokens.toFixed(1)} tokens</div>
                                        <div className="input-group">
                                            <input type="number" placeholder="Amount" value={offerAmount} onChange={e => setOfferAmount(e.target.value)} />
                                            <input type="number" placeholder="Price per token" value={offerPrice} onChange={e => setOfferPrice(e.target.value)} />
                                        </div>
                                        <button onClick={createOffer} disabled={!offerAmount || !offerPrice || offerAmount > tokens} className="create-offer-btn">Create Sell Offer</button>
                                    </div>
                                </div>
                                <div className="offers-container">
                                    <h3>Your Active Offers</h3>
                                    <div className="offers-list">
                                        {tokenOffers.map((offer) => (
                                            <div key={offer.id} className="offer-box">
                                                <div className="offer-header">
                                                    <span className="offer-amount">{offer.amount} tokens</span>
                                                    <span className="offer-time">{offer.timestamp}</span>
                                                </div>
                                                <div className="offer-details">
                                                    <span className="offer-price">${offer.price} per token</span>
                                                    <button onClick={() => cancelOffer(offer.id)} className="cancel-btn">Cancel</button>
                                                </div>
                                            </div>
                                        ))}
                                        {tokenOffers.length === 0 && <div className="no-offers">No active offers</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RealTimeGraph;
