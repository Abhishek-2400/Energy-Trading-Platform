"use client";

import React from "react";
import './page.css';
import MapComponent from "../../../components/Maps/maps";
import Navbar from "../../../components/Navbar/Navbar";


export default function Marketplace() {
    return (
        <><Navbar />
            <div className="details">
                <h2>Detailed view of Harman Energy trading</h2>
                <MapComponent />
                <div className="seller-info">
                    <p>Name of seller <span>: Gurugram Electricity corporation</span></p>
                    <p>Price per unit <span>: 1200 KWH</span></p>
                    <p>Quantity <span>: 600 KWH</span></p>
                    <p>Available units <span>: 2000 KWH</span></p>
                    <p>Supply Duration <span>: 100 KWH 6 months (Negotiable)</span></p>
                    <p>Trading Terms <span>: Full payment upfront, 15-day delivery</span></p>
                    <button>Tranfer Owener ship</button>
                </div>

            </div>
        </>
    );
}