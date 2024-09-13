"use client";
import React from "react";
import './page.css';
import Buyers from "../../../components/Buyers/buyers";
import RealTimeGraph from "../../../components/Charts/chart";


export default function Marketplace() {
    return (
        <div className="market">
            <h2>Welcome to India's first Energy Marketplace</h2>
            <Buyers />
            <RealTimeGraph />
        </div>
    );
}