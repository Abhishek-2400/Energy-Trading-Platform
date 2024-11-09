"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './page.css';
import Navbar from '../../../../components/Navbar/Navbar';
import UserDashboard from '../../../../components/Dashboard/dashboard';

const Weekly = () => {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get('/api/products/getusertransactions');
                if (!response.data.error) {
                    setListings(response.data.data);
                } else {
                    console.error(response.data.error);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchListings();
    }, []);

    return (
        <div className="dashboard-page">
            <Navbar />
            <div className="content-layout">
                <UserDashboard />
                <div className="dashboard-content">
                    <h2 className="dashboard-heading">Transactions History</h2>
                    <div className="listings-container">
                        {listings.map((listing) => (
                            <div key={listing.id} className="listing-card">
                                <div className="listing-header">
                                    <h3>{listing.sellername}</h3>
                                </div>
                                <div className="listing-details">
                                    <p><strong>Price per Unit:</strong> {listing.unitCost}</p>
                                    <p><strong>Tokens:</strong> {listing.units}</p>
                                    <p><strong>Total Cost:</strong> {listing.totalCost}</p>
                                    <p><strong>Location:</strong> {listing.locations}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weekly;
