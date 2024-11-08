"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './page.css';
import Navbar from '../../../../components/Navbar/Navbar';
import UserDashboard from '../../../../components/Dashboard/dashboard';

const Weekly = () => {
    const [listings, setListings] = useState([]);

    const handleDelete = async (id) => {
        const payload = {
            prodid: id,
        };
        try {
            const response = await axios.post('/api/products/deleteproduct', payload);
            if (!response) {
                console.log("Error deleting product");
            } else {
                console.log("Product deleted successfully", response.data);
                // Update the listings state to remove the deleted item
                setListings(listings.filter((listing) => listing.id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get('/api/products/getproducts');
                if (!response.data.error) {
                    console.log(response.data.data);
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
                    <h2>Manage Listings</h2>
                    <div className="listings-container">
                        {listings.map((listing) => (
                            <div key={listing.id} className="listing-card">
                                <h3>{listing.sellername}</h3>
                                <p><strong>Price per Unit:</strong> {listing.priceperunit}</p>
                                <p><strong>Tokens:</strong> {listing.tokens}</p>
                                <p><strong>Location:</strong> {listing.locations}</p>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(listing.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weekly;
