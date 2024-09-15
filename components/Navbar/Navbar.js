"use client";
import React from "react";
import './Navbar.css';
import Link from 'next/link';
export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-heading"><Link href="/">EnergyHive</Link></div>
            <ul className="navbar-menu">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/realtimePricing">Realtime Pricing</Link></li>
                <li><Link href="/worldmap">Global Energy Market</Link></li>
                <li><Link href="/bids">Biding Arena</Link></li>
                <li><Link href="/marketplace">Market Place</Link></li>
                <button>Signup</button>
            </ul>
        </nav>
    );
}