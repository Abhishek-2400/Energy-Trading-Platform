"use client";
import React from "react";
import './Navbar.css';
import Link from 'next/link';
export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-heading">EnergyHive</div>
            <ul className="navbar-menu">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/marketplace">Market Place</Link></li>
                <button>Signup</button>
            </ul>
        </nav>
    );
}