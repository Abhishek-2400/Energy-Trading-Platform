"use client";
import React from "react";
import './page.css';
import Buyers from "../../../components/Buyers/buyers";
import Navbar from "../../../components/Navbar/Navbar";

export default function Marketplace() {
    return (
        <>
            <Navbar />
            <div className="market">
                <h2>Welcome to India&apos;s first Energy Marketplace</h2>
                <Buyers />
            </div>
        </>
    );
}
