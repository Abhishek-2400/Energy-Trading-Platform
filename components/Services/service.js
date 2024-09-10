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
                <Cards image='/ai.png' head='Ai' text='Ai head' />
                <Cards image='/decentralized.png' head='Ai' text='Ai head' />
                <Cards image='/monitor.png' head='Ai' text='Ai head' />
                <Cards image='/pay.png' head='Ai' text='Ai head' />
            </div>
        </>
    );
}