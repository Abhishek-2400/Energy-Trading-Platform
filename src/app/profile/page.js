"use client";

import { useState } from "react";
import axios from "axios";
import "./profile.css";
import { useSelector } from "react-redux";
import Navbar from "../../../components/Navbar/Navbar";
export default function Profile() {
    const email1 = useSelector((state) => state.user.currentUser.data.email);

    const [tokens, setTokens] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        
       
        setLoading(true);

        const payload = {
            email: email1,
            approxTokens: tokens,
            maxPrice: maxPrice,
        };

        try {
            await axios.post("/api/products/addprofile", payload);
            alert("Preferences saved successfully");
            setTokens("");
            setMaxPrice("");
        } catch (err) {
            console.error(err);
            alert("Failed to save preferences");
        } finally {
            setLoading(false);
        }
    };

    return (
        
        <div className="profile-container">
            <Navbar/>
            <div className="profile-card">
                <h1 className="profile-title">Auto-Buy Preferences</h1>

                <form  className="profile-form">
                    <div className="form-group">
                        <label className="form-label">Approx Tokens</label>
                        <input
                            type="number"
                            value={tokens}
                            onChange={(e) => setTokens(e.target.value)}
                            className="form-input"
                            placeholder="e.g. 100"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Max Price Per Token (ETH)</label>
                        <input
                            type="number"
                            step="0.0001"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="form-input"
                            placeholder="e.g. 0.01"
                            required
                        />
                    </div>

                    <button onClick={handleSubmit}
                        type="submit"
                        className={`form-button ${loading ? "disabled" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save Preferences"}
                    </button>
                </form>
            </div>
        </div>
    );
}
