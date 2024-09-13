"use client";
import React from "react";

import "./service.css";
import Cards from "../Cards/cards";

export default function Service() {
    return (
        <>
            <div className="service-head">
                <h1>Our Services</h1>
            </div>
            <div className="cards">
                <Cards image='/ai.png' head='Predictive Analysis' text='Predictive Analysis using AI&ML' />
                <Cards image='/decentralized.png' head='Decentralizarion' text='Decentralized Marketplce using Blockchain' />
                <Cards image='/monitor.png' head='Realtime Pricing' text='Realtime Price analysis' />
                <Cards image='/pay.png' head='Secure Payments' text='Smart Contract based Payments' />
            </div>
        </>
    );
}