"use client";
import React from "react";
import './Navbar.css';
export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-heading">EnergyHive</div>
            <ul className="navbar-menu">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#marketplace">Market Place</a></li>
            </ul>
        </nav>
    );
}