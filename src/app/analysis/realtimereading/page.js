<<<<<<< Updated upstream
"use client";
import React, { useState, useEffect } from "react";
import { Zap } from "lucide-react";
import axios from "axios";
import { io } from "socket.io-client";
import Navbar from "../../../../components/Navbar/Navbar";
import UserDashboard from "../../../../components/Dashboard/dashboard";
import "./page.css";
=======
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





// "use client";
// import React, { useState, useEffect } from 'react';
// import { ArrowRight, Battery, Zap } from 'lucide-react';
// import './page.css';
// import Navbar from '../../../../components/Navbar/Navbar';
// import UserDashboard from '../../../../components/Dashboard/dashboard';
// import { io } from 'socket.io-client';

// const RealTimeGraph = () => {
//     const [payload, setPayload] = useState({
//         usermail: "",
//         sellername: "",
//         priceperunit: 0,
//         // tokens: Math.floor(Math.random() * 100),
//         locations: "",
//     });
//     const [solarProduction, setSolarProduction] = useState(0);
//     const [consumption, setConsumption] = useState(0);
//     const [tokens, setTokens] = useState(500);
//     const [tokenOffers, setTokenOffers] = useState([]);
//     const [gridBalance, setGridBalance] = useState(0);
//     const [offerAmount, setOfferAmount] = useState('');
//     const [offerPrice, setOfferPrice] = useState('');

//     useEffect(() => {
//         const socket = io('http://localhost:5500');
//         socket.on('connect', () => {
//             console.log('Connected to server');
//         });

//         socket.on('meterReadingUpdate', (newData) => {
//             setSolarProduction(newData.production);
//             setConsumption(newData.consumption);
//             setGridBalance(newData.balance);
//             if (newData.balance > 0) {
//                 setTokens(prev => prev + newData.balance);
//             } else {
//                 setTokens(prev => Math.max(0, prev + newData.balance));
//             }
//         });

//         return () => {
//             socket.disconnect();
//         };
//     }, []);

//     const createOffer = async () => {

//         if (!offerAmount || !offerPrice || offerAmount > tokens) return;

//         const newOffer = {
//             id: Date.now(),
//             amount: parseInt(offerAmount),
//             price: parseFloat(offerPrice),
//             timestamp: new Date().toLocaleTimeString(),
//             status: 'active'
//         };

//         setTokenOffers(prev => [...prev, newOffer]);
//         setTokens(prev => prev - parseInt(offerAmount));
//         setOfferAmount('');
//         setOfferPrice('');


//         try {
//             console.log(100)
//             const userinfo = await axios.get('/api/auth/userinfo');
//             console.log("userinfo", userinfo.data.data.email);
//             payload.usermail = userinfo?.data?.data?.email;

//             const response = await axios.post('/api/products/addproduct', payload);
//             if (response?.data?.message) {
//                 alert(response.data.message);
//             } else {
//                 alert(response?.data?.error || 'Failed to add product');
//             }
//         } catch (error) {
//             alert('Failed to add product');
//             console.log("Failed to add product", error.message);
//         }
//     };

// };

// const cancelOffer = (offerId) => {
//     setTokenOffers(prev => {
//         const offer = prev.find(o => o.id === offerId);
//         if (offer && offer.status === 'active') {
//             setTokens(t => t + offer.amount);
//         }
//         return prev.filter(o => o.id !== offerId);
//     });
// };

// return (
//     <div className="dashboard-page">
//         <Navbar />
//         <div className="content-layout">
//             <UserDashboard />
//             <div className="dashboard-content">
//                 <div className="card">
//                     <div className="card-header">
//                         <h2 className="card-title">
//                             <Zap className="icon-yellow" />
//                             Real-time P2P Energy Trading Platform
//                         </h2>
//                     </div>
//                     <div className="card-content">
//                         <div className="grid-container">
//                             <div className="metrics-container">
//                                 <div className="metric-box">
//                                     <h3>Real-time Energy Flow</h3>
//                                     <div className="energy-stats">
//                                         <div className="stat">
//                                             <div className="label production">Production</div>
//                                             <div className="value">{solarProduction} kW</div>
//                                         </div>
//                                         <div className="stat">
//                                             <div className="label consumption">Consumption</div>
//                                             <div className="value">{consumption} kW</div>
//                                         </div>
//                                         <div className="stat">
//                                             <div className="label balance">Grid Balance</div>
//                                             <div className={`value ${gridBalance >= 0 ? 'positive' : 'negative'}`}>{gridBalance} kW</div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="metric-box">
//                                     <h3>Energy Tokens</h3>
//                                     <div className="token-balance">{tokens.toFixed(1)} tokens</div>
//                                     <div className="input-group">
//                                         <input type="number" placeholder="Amount" value={offerAmount} onChange={e => setOfferAmount(e.target.value)} />
//                                         <input type="number" placeholder="Price per token" value={offerPrice} onChange={e => setOfferPrice(e.target.value)} />
//                                     </div>
//                                     <button onClick={createOffer} disabled={!offerAmount || !offerPrice || offerAmount > tokens} className="create-offer-btn">Create Sell Offer</button>
//                                 </div>
//                             </div>
//                             <div className="offers-container">
//                                 <h3>Your Active Offers</h3>
//                                 <div className="offers-list">
//                                     {tokenOffers.map(offer => (
//                                         <div key={offer.id} className="offer-box">
//                                             <div className="offer-header">
//                                                 <span className="offer-amount">{offer.amount} tokens</span>
//                                                 <span className="offer-time">{offer.timestamp}</span>
//                                             </div>
//                                             <div className="offer-details">
//                                                 <span className="offer-price">${offer.price} per token</span>
//                                                 <button onClick={() => cancelOffer(offer.id)} className="cancel-btn">Cancel</button>
//                                             </div>
//                                         </div>
//                                     ))}
//                                     {tokenOffers.length === 0 && <div className="no-offers">No active offers</div>}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// );
// };

// export default RealTimeGraph;


"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight, Battery, Zap } from "lucide-react";
import axios from "axios"; // Added missing import
import "./page.css";
import Navbar from "../../../../components/Navbar/Navbar";
import UserDashboard from "../../../../components/Dashboard/dashboard";
import { io } from "socket.io-client";
>>>>>>> Stashed changes

const RealTimeGraph = () => {

    const [solarProduction, setSolarProduction] = useState(0);
    const [consumption, setConsumption] = useState(0);
    const [tokens, setTokens] = useState(500);
    const [tokenOffers, setTokenOffers] = useState([]);
    const [gridBalance, setGridBalance] = useState(0);
    const [offerAmount, setOfferAmount] = useState("");
    const [offerPrice, setOfferPrice] = useState("");
<<<<<<< Updated upstream
    const [userid, setUserId] = useState("");
    console.log(userid, 111);
    useEffect(() => {
        const socket1 = io("https://websocket-p2p.onrender.com"); //replace with local host in development
        const socket2 = io("https://apachekafka-p2p.onrender.com");//replace with local host in development

        const fetchUserInfo = async () => {
            try {
                const userinfo = await axios.get("/api/auth/userinfo");
                console.log("User info:", userinfo.data);
                setUserId(userinfo.data.data._id);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        fetchUserInfo();

        socket1.on("connect", () => console.log("Connected to server 5500"));
        socket2.on("connect", () => console.log("Connected to server 8080"));

        socket1.on("meterReadingUpdate", (newData) => {
=======

    useEffect(() => {
        const socket = io("http://localhost:5500");
        socket.on("connect", () => {
            console.log("Connected to server");
        });

        socket.on("meterReadingUpdate", (newData) => {
>>>>>>> Stashed changes
            setSolarProduction(newData.production);
            setConsumption(newData.consumption);
            setGridBalance(newData.balance);
            setTokens((prev) => Math.max(0, prev + newData.balance));
<<<<<<< Updated upstream

            if (userid) {
                const messageValue = {
                    userId: userid,
                    production: newData.production,
                    consumption: newData.consumption,
                    balance: newData.balance,
                    time: newData.time,
                };
                socket2.emit("newdata", messageValue);
            }
=======
>>>>>>> Stashed changes
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

        setTokenOffers((prev) => [...prev, newOffer]);
        setTokens((prev) => prev - parseInt(offerAmount));
        setOfferAmount("");
        setOfferPrice("");
<<<<<<< Updated upstream
    };

    const cancelOffer = (offerId) => {
        setTokenOffers((prev) => {
            const offer = prev.find((o) => o.id === offerId);
            if (offer && offer.status === "active") {
                setTokens((t) => t + offer.amount);
            }
            return prev.filter((o) => o.id !== offerId);
        });
=======

        try {
            console.log("Fetching user info...");
            const userinfo = await axios.get("/api/auth/userinfo");
            const userEmail = userinfo?.data?.data?.email || "";


            const response = await axios.post("/api/products/addproduct", {
                usermail: userEmail,
                sellername: "test",
                priceperunit: offerPrice,
                tokens: offerAmount,
                locations: "gzb"
            });

            if (response?.data?.message) {
                alert(response.data.message);
            } else {
                alert(response?.data?.error || "Failed to add product");
            }
        } catch (error) {
            alert("Failed to add product");
            console.error("Error:", error.message);
        }
    };

    const cancelOffer = async (offerId) => {
        try {
        
            const response = await axios.post("/api/products/deleteproduct", { prodid: offerId });
    
            if (response.status === 200) {
               
                setTokenOffers((prev) => {
                    const offer = prev.find((o) => o.id === offerId);
                    if (offer && offer.status === "active") {
                        setTokens((t) => t+ offer.amount*0.5);
                    }
    
                    return prev.filter((o) => o.id !== offerId);
                });
    
                alert("Offer canceled successfully!");
            } else {
                alert(response.data.error || "Failed to cancel offer");
            }
        } catch (error) {
            console.error("Error canceling offer:", error);
            alert("An error occurred while canceling the offer");
        }
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                                                <div className={`value ${gridBalance >= 0 ? "positive" : "negative"}`}>
                                                    {gridBalance} kW
                                                </div>
=======
                                                <div className={`value ${gridBalance >= 0 ? "positive" : "negative"}`}>{gridBalance} kW</div>
>>>>>>> Stashed changes
                                            </div>
                                        </div>
                                    </div>
                                    <div className="metric-box">
                                        <h3>Energy Tokens</h3>
                                        <div className="token-balance">{tokens.toFixed(1)} tokens</div>
                                        <div className="input-group">
<<<<<<< Updated upstream
                                            <input
                                                type="number"
                                                placeholder="Amount"
                                                value={offerAmount}
                                                onChange={(e) => setOfferAmount(e.target.value)}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Price per token"
                                                value={offerPrice}
                                                onChange={(e) => setOfferPrice(e.target.value)}
                                            />
                                        </div>
                                        <button
                                            onClick={createOffer}
                                            disabled={!offerAmount || !offerPrice || offerAmount > tokens}
                                            className="create-offer-btn"
                                        >
=======
                                            <input type="number" placeholder="Amount" value={offerAmount} onChange={(e) => setOfferAmount(e.target.value)} />
                                            <input type="number" placeholder="Price per token" value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)} />
                                        </div>
                                        <button onClick={createOffer} disabled={!offerAmount || !offerPrice || offerAmount > tokens} className="create-offer-btn">
>>>>>>> Stashed changes
                                            Create Sell Offer
                                        </button>
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
<<<<<<< Updated upstream
                                                    <button
                                                        onClick={() => cancelOffer(offer.id)}
                                                        className="cancel-btn"
                                                    >
=======
                                                    <button onClick={() => cancelOffer(offer.id)} className="cancel-btn">
>>>>>>> Stashed changes
                                                        Cancel
                                                    </button>
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