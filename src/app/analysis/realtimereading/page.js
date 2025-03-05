"use client";
import React, { useState, useEffect } from "react";
import { Zap } from "lucide-react";
import axios from "axios";
import { io } from "socket.io-client";
import Navbar from "../../../../components/Navbar/Navbar";
import UserDashboard from "../../../../components/Dashboard/dashboard";
import "./page.css";

const RealTimeGraph = () => {

    const [solarProduction, setSolarProduction] = useState(0);
    const [consumption, setConsumption] = useState(0);
    const [tokens, setTokens] = useState(500);
    const [tokenOffers, setTokenOffers] = useState([]);
    const [gridBalance, setGridBalance] = useState(0);
    const [offerAmount, setOfferAmount] = useState("");
    const [offerPrice, setOfferPrice] = useState("");
    const [userid, setUserId] = useState("");
    console.log(userid, 111);
    useEffect(() => {
        const socket1 = io("https://websocket-p2p.onrender.com");
        const socket2 = io("https://apachekafka-p2p.onrender.com");
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
            setSolarProduction(newData.production);
            setConsumption(newData.consumption);
            setGridBalance(newData.balance);
            setTokens((prev) => Math.max(0, prev + newData.balance));

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
    };

    const cancelOffer = (offerId) => {
        setTokenOffers((prev) => {
            const offer = prev.find((o) => o.id === offerId);
            if (offer && offer.status === "active") {
                setTokens((t) => t + offer.amount);
            }
            return prev.filter((o) => o.id !== offerId);
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
                                                <div className={`value ${gridBalance >= 0 ? "positive" : "negative"}`}>
                                                    {gridBalance} kW
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="metric-box">
                                        <h3>Energy Tokens</h3>
                                        <div className="token-balance">{tokens.toFixed(1)} tokens</div>
                                        {/* <div className="input-group">
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
                                        </div> */}
                                        {/* <button
                                            onClick={createOffer}
                                            disabled={!offerAmount || !offerPrice || offerAmount > tokens}
                                            className="create-offer-btn"
                                        >
                                            Create Sell Offer
                                        </button> */}
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