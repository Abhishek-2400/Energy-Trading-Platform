"use client"
import { useState, useEffect } from "react";
import "./add.css";
import { useSelector, useDispatch } from "react-redux";
import Navbar from '../../../../components/Navbar/Navbar';
import UserDashboard from '../../../../components/Dashboard/dashboard';
import axios from "axios";
import { tokenPlus } from "../../../redux/user/userSlice";


const EnergyTradingDashboard = () => {
    const dispatch = useDispatch();
    const [totalProduction, setTotalProduction] = useState(0);
    const [totalConsumption, setTotalConsumption] = useState(0);
    const [gridBalance, setGridBalance] = useState(0);
    const [tokens, setTokens] = useState(0);
    const [amount, setAmount] = useState("");
    const [price, setPrice] = useState("");
    const email = useSelector((state) => state.user.currentUser.data.email);
    const username = useSelector((state) => state.user.currentUser.data.username);



    const fetchData = async () => {
        try {

            const response = await fetch(`/api/products/getenergyrecords/${email}`);

            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            const production = data.reduce((sum, record) => sum + record.totalProduction, 0);
            const consumption = data.reduce((sum, record) => sum + record.totalConsumption, 0);
            const balance = production - consumption;

            setTotalProduction(production);
            setTotalConsumption(consumption);
            setGridBalance(balance);
            setTokens(balance);


            if (balance > 0) {
                await addTradableTokens(balance);
            }
        } catch (error) {
            console.error("Error fetching energy data:", error);
        }
    };


    const handleSellOffer = async () => {
        if (!amount || !price) return alert("Enter valid values");

        try {
            const response = await axios.post("/api/products/addproduct", {
                email,
                sellername: username,
                priceperunit: price,
                tokens: amount,

            });

            dispatch(tokenPlus(amount));


            setTokens((prev) => prev - amount);
            setGridBalance(gridBalance - amount)
            setAmount("");
            setPrice("");
            alert("Tokens sucessfully added ")
        } catch (error) {
            console.error("Error creating sell offer:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);

    }, []);

    return (
        <div>
            <UserDashboard />
            <Navbar />


            <div className="dashboard">
                <h2 className="dashboard-title">⚡ Real-time P2P Energy Trading</h2>

                <div className="energy-stats">
                    <h3 className="section-title">Real-time Energy Flow</h3>
                    <div className="energy-values">
                        <div className="energy-box production">
                            <span>Production   </span>
                            <strong>{totalProduction} kW</strong>
                        </div>
                        <div className="energy-box consumption">
                            <span >Consumption   </span>
                            <strong>{totalConsumption} kW</strong>
                        </div>
                        <div className="energy-box balance">
                            <span>Grid Balance   </span>
                            <strong>{gridBalance} kW</strong>
                        </div>
                    </div>
                </div>

                <div className="tokens-section">
                    <h3 className="section-title">Energy Tokens</h3>
                    <p className="token-value">{tokens.toFixed(1)} tokens</p>

                    <div className="sell-offer">
                        <input
                            type="number"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
                            className="sell-input"
                        />
                        <input
                            type="number"
                            placeholder="Price per token"
                            value={price}
                            onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")}
                            className="sell-input"
                        />
                        <button onClick={handleSellOffer} className="sell-btn">Create Sell Offer</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnergyTradingDashboard;
