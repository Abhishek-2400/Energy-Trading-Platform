"use client";
import React from "react";
import './Navbar.css';
import Link from 'next/link';
export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-heading"><Link href='/'>EnergyHive</Link></div>
            <ul className="navbar-menu">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/realtimePricing">Pricing</Link></li>
                <li><Link href="/worldmap">Traders</Link></li>
                <li><Link href="/bids">Biding</Link></li>
                <li><Link href="/marketplace">Market</Link></li>
                <li><Link href="/"><button>Signup</button></Link></li>

            </ul>
        </nav>
    );
}